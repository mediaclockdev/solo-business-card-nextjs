"use client";
export interface UserAccountData {
  email: string;
  hearAboutUs: string;
  firstName: string;
  registrationDate: string;
  hasCompletedOnboarding: boolean;
}

const USER_STORAGE_KEY = 'user_account_data';

export const saveUserData = (userData: UserAccountData): void => {
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    console.log('User data saved:', userData);
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

export const loadUserData = (): UserAccountData | null => {
  try {
    const saved = localStorage.getItem(USER_STORAGE_KEY);
    if (saved) {
      const userData = JSON.parse(saved);
      console.log('User data loaded:', userData);
      return userData;
    }
    return null;
  } catch (error) {
    console.error('Error loading user data:', error);
    return null;
  }
};

export const hasUserAccount = (): boolean => {
  try {
    const userData = loadUserData();
    return userData !== null && userData.hasCompletedOnboarding;
  } catch (error) {
    console.error('Error checking user account:', error);
    return false;
  }
};

export const clearUserData = (): void => {
  try {
    localStorage.removeItem(USER_STORAGE_KEY);
    console.log('User data cleared');
  } catch (error) {
    console.error('Error clearing user data:', error);
  }
};

export const updateUserOnboardingStatus = (completed: boolean): void => {
  try {
    const userData = loadUserData();
    if (userData) {
      userData.hasCompletedOnboarding = completed;
      saveUserData(userData);
    }
  } catch (error) {
    console.error('Error updating user onboarding status:', error);
  }
};
