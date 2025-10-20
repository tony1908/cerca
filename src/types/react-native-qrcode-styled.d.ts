declare module 'react-native-qrcode-styled' {
  import { Component } from 'react';

  interface QRCodeProps {
    data: string;
    style?: any;
    pieceSize?: number;
    pieceScale?: number;
    pieceRotation?: number;
    pieceCornerType?: 'rounded' | 'cut';
    pieceBorderRadius?: number;
    isPiecesGlued?: boolean;
    color?: string;
    innerEyesOptions?: {
      borderRadius?: number;
      scale?: number;
    };
    outerEyesOptions?: {
      borderRadius?: number;
      scale?: number;
    };
    gradient?: {
      type?: 'linear' | 'radial';
      options?: {
        colors?: string[];
        start?: [number, number];
        end?: [number, number];
      };
    };
    logo?: any;
    logoSize?: number;
    logoBackgroundColor?: string;
    children?: any;
  }

  export default class QRCode extends Component<QRCodeProps> {}
}