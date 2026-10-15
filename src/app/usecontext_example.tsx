import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemeProvider, useThemeContext } from '@/contexts/theme-context';

export default function UseContextExampleScreen() {
  return (
    <ThemeProvider>
      <DarkModeExample />
    </ThemeProvider>
  );
}

function DarkModeExample() {
  const { colors, theme } = useThemeContext();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heading}>
          <Text style={[styles.eyebrow, { color: colors.textMuted }]}>CODELAB 1</Text>
          <Text style={[styles.title, { color: colors.text }]}>React Context</Text>
          <Text style={[styles.description, { color: colors.textMuted }]}>
            Gunakan Context untuk membagikan tema ke beberapa komponen tanpa meneruskan props
            satu per satu.
          </Text>
        </View>

        <ThemeInfoCard />

        <ThemeToggleButton />

        <Text style={[styles.currentTheme, { color: colors.textMuted }]}>
          Tema aktif: {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function ThemeInfoCard() {
  const { colors, theme } = useThemeContext();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}>
      <Text style={[styles.cardTitle, { color: colors.text }]}>Komponen dengan useContext</Text>
      <Text style={[styles.cardText, { color: colors.textMuted }]}>
        {theme === 'light'
          ? 'Kartu ini membaca tema Light Mode dari ThemeContext.'
          : 'Kartu ini membaca tema Dark Mode dari ThemeContext.'}
      </Text>
    </View>
  );
}

function ThemeToggleButton() {
  const { colors, theme, toggleTheme } = useThemeContext();
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Aktifkan ${nextTheme === 'light' ? 'Light' : 'Dark'} Mode`}
      onPress={toggleTheme}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: colors.button,
          opacity: pressed ? 0.8 : 1,
        },
      ]}>
      <Text style={[styles.buttonText, { color: colors.buttonText }]}>
        Aktifkan {nextTheme === 'light' ? 'Light' : 'Dark'} Mode
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    maxWidth: 560,
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 24,
  },
  heading: {
    gap: 12,
  },
  eyebrow: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardText: {
    fontSize: 15,
    lineHeight: 22,
  },
  button: {
    minHeight: 52,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  currentTheme: {
    fontSize: 14,
    textAlign: 'center',
  },
});
