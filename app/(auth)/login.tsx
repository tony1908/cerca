import { View, Text, TouchableOpacity, ImageBackground, Dimensions, ScrollView } from "react-native";
import { Colors } from "@/constants/Colors";
import { typography, spacing, borderRadius, shadows } from "@/constants/SoftUIStyles";
import { useColorScheme } from "react-native";
import { useState, useRef, useEffect } from "react";
import StyledBottomSheet from "@/components/StyledBottomSheet";
import EmailLoginForm from "@/components/EmailLoginForm";
import { LinearGradient } from "expo-linear-gradient";

const { width: screenWidth } = Dimensions.get('window');

const carouselData = [
  {
    title: "Smart Finance\nBrightest Future",
    description: "Grow Your Wealth Effortlessly.\nYour Financial Future Starts Here."
  },
  {
    title: "Secure & Private\nYour Assets",
    description: "Bank-level security with\ndecentralized technology."
  },
  {
    title: "Track & Manage\nAll in One Place",
    description: "Monitor your portfolio\nand transactions seamlessly."
  }
];

export default function Login() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollViewRef = useRef<ScrollView>(null);

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % carouselData.length;
        scrollViewRef.current?.scrollTo({
          x: nextIndex * screenWidth,
          animated: true,
        });
        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ImageBackground
      source={require('@/assets/images/home.png')}
      style={{ flex: 1, width: '100%', height: '100%' }}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.9)']}
        style={{
          flex: 1,
          justifyContent: 'space-between',
          paddingVertical: spacing.xxxl * 2,
          paddingHorizontal: spacing.xl,
        }}
      >
        {/* Top Section - Logo - Moved higher */}
        <View style={{ alignItems: 'center', marginTop: spacing.md }}>
          <Text style={[
            typography.hero,
            {
              color: colors.accent,
              fontSize: 42,
              letterSpacing: 2,
            }
          ]}>
            Cerca
          </Text>
        </View>

        {/* Bottom Section - Content */}
        <View>
          {/* Carousel for Headlines */}
          <View style={{ marginBottom: spacing.xxxl, height: 180 }}>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(event) => {
                const newIndex = Math.round(
                  event.nativeEvent.contentOffset.x / screenWidth
                );
                setCurrentIndex(newIndex);
              }}
            >
              {carouselData.map((item, index) => (
                <View key={index} style={{ width: screenWidth, paddingHorizontal: spacing.xl }}>
                  <Text style={[
                    typography.hero,
                    {
                      color: '#FFFFFF',
                      fontSize: 36,
                      textAlign: 'center',
                      marginBottom: spacing.md,
                      lineHeight: 44,
                    }
                  ]}>
                    {item.title}
                  </Text>

                  <Text style={[
                    typography.bodyText,
                    {
                      color: 'rgba(255, 255, 255, 0.8)',
                      textAlign: 'center',
                      fontSize: 16,
                      lineHeight: 24,
                    }
                  ]}>
                    {item.description}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Pagination Dots - Now dynamic based on carousel */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: spacing.xxl,
            gap: spacing.sm,
          }}>
            {carouselData.map((_, index) => (
              <View
                key={index}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: currentIndex === index ? colors.accent : 'rgba(255, 255, 255, 0.3)',
                }}
              />
            ))}
          </View>

          {/* Get Started Button */}
          <TouchableOpacity
            style={{
              backgroundColor: colors.accent,
              paddingVertical: spacing.xl,
              borderRadius: borderRadius.extraLarge,
              alignItems: 'center',
              ...shadows.convex.dark,
            }}
            onPress={() => setIsModalOpen(true)}
          >
            <Text style={[
              typography.primaryTitle,
              {
                color: colors.transactionText,
                fontWeight: '600',
                fontSize: 18,
              }
            ]}>
              Let's Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Email Login Bottom Sheet */}
      <StyledBottomSheet
        title="Sign In"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        snapPoints={['60%', '80%']}
      >
        <EmailLoginForm
          onClose={handleCloseModal}
          onSuccess={handleCloseModal}
        />
      </StyledBottomSheet>
    </ImageBackground>
  );
}
