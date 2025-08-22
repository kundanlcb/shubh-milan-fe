# 🚀 shubhMilan Development Instructions

## 📖 Quick Start Guide

### Current Project Status
This is a React Native matrimonial app focused on the Mithila community. The project has basic structure but needs immediate attention on core files and navigation setup.

### Immediate Actions Needed

#### 1. Complete Missing Constants (HIGH PRIORITY)
The app currently has empty constant files that need implementation:

**Colors (`src/constants/colors.ts`)**
- Define Mithila-inspired color palette
- Include primary/secondary colors, text colors, backgrounds
- Add cultural colors (traditional Mithila art colors)

**Styles (`src/constants/styles.ts`)**
- Create global style definitions
- Typography scales for Hindi/English text
- Reusable style objects

#### 2. Fix Navigation Setup
- Complete navigation types in `src/types/navigation.ts`
- Setup AuthStack and MainStack navigators
- Connect LoginScreen to proper navigation flow

#### 3. Complete RegisterScreen
- Currently empty file needs full implementation
- Multi-step registration form
- Cultural preference fields

### Development Workflow

#### Daily Development Process
1. **Morning**: Check DEVELOPMENT_CHECKLIST.md for today's tasks
2. **Code**: Work on highest priority items first
3. **Test**: Run on both iOS and Android simulators
4. **Evening**: Update checklist with progress

#### Weekly Review Process
1. Update progress in DEVELOPMENT_CHECKLIST.md
2. Review PRD.md for any requirement changes
3. Plan next week's priorities
4. Update this instruction file if needed

### Code Standards

#### File Organization
```
src/
├── components/         # Reusable UI components
├── screens/           # Screen components
├── navigation/        # Navigation setup
├── services/          # API and business logic
├── utils/             # Helper functions
├── constants/         # App constants
├── types/             # TypeScript types
└── hooks/             # Custom React hooks
```

#### Naming Conventions
- **Components**: PascalCase (e.g., `LoginScreen.tsx`)
- **Files**: camelCase (e.g., `authService.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `PRIMARY_COLOR`)
- **Functions**: camelCase (e.g., `handleLogin`)

#### TypeScript Guidelines
- Always define interfaces for props
- Use proper typing for navigation
- Avoid `any` type usage
- Define API response types

### Cultural Considerations

#### Mithila Community Focus
- Use appropriate Hindi/Maithili text
- Respect traditional values in UI/UX
- Include cultural elements in design
- Consider regional preferences

#### Content Guidelines
- Use respectful language for matrimonial context
- Include traditional biodata format options
- Support for family-oriented features
- Cultural festival and event integration

### Testing Strategy

#### Manual Testing Checklist
- [ ] Test on iOS simulator
- [ ] Test on Android emulator
- [ ] Test form validations
- [ ] Test navigation flows
- [ ] Test on different screen sizes

#### Automated Testing
- Unit tests for utility functions
- Component testing for screens
- Integration tests for user flows
- E2E testing for critical paths

### Performance Guidelines

#### React Native Best Practices
- Use FlatList for large lists
- Optimize images (use appropriate sizes)
- Implement lazy loading where possible
- Avoid unnecessary re-renders

#### Memory Management
- Clean up listeners on unmount
- Optimize image loading
- Use pagination for large datasets
- Monitor app performance metrics

### Security Considerations

#### Data Protection
- Never store sensitive data in plain text
- Use secure storage for authentication tokens
- Implement proper input validation
- Follow OWASP mobile security guidelines

#### Privacy Features
- Granular privacy controls for profiles
- Secure photo sharing mechanisms
- User blocking and reporting features
- Data deletion capabilities

### Common Issues & Solutions

#### Navigation Issues
```typescript
// Proper navigation typing
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;
```

#### Styling Issues
```typescript
// Use consistent color imports
import { Colors } from '../constants/colors';

// Proper style definitions
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
```

#### Form Validation
```typescript
// Proper form validation
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

### Debugging Tips

#### React Native Debugger
- Use Flipper for debugging
- Enable network inspection
- Monitor Redux state (when implemented)
- Check memory usage

#### Common Debug Commands
```bash
# Clear cache and restart
npx react-native start --reset-cache

# Run on specific simulator
npx react-native run-ios --simulator="iPhone 14"

# Check bundle size
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle
```

### Release Preparation

#### Pre-Release Checklist
- [ ] Update version in package.json
- [ ] Test on physical devices
- [ ] Update app icons and splash screens
- [ ] Prepare app store assets
- [ ] Update privacy policy and terms
- [ ] Create release notes

#### App Store Requirements
- **iOS**: App Store guidelines compliance
- **Android**: Google Play policy compliance
- Screenshots for all device sizes
- App descriptions in multiple languages
- Privacy policy and terms of service

### Contact & Support

#### Documentation References
- **PRD.md**: Complete product requirements
- **DEVELOPMENT_CHECKLIST.md**: Detailed task tracking
- **README.md**: Basic project information

#### External Resources
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation Guide](https://reactnavigation.org/docs/getting-started)
- [React Native Paper](https://reactnativepaper.com/)

---

**Remember**: This is a culturally-sensitive matrimonial app. Always consider the traditional values and cultural aspects of the Mithila community in your development decisions.

**Next Steps**: Start with implementing the missing constants files, then move to completing the navigation setup and RegisterScreen implementation.
