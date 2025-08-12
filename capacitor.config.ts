import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.287a45b04600452f822449733f136863',
  appName: 'pcos-cycle-whisperer',
  webDir: 'dist',
  server: {
    url: 'https://287a45b0-4600-452f-8224-49733f136863.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ec4899',
      showSpinner: true,
      spinnerColor: '#ffffff'
    }
  }
};

export default config;