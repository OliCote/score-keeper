import { FirebaseError } from 'firebase/app';
import SupportedLanguages from '../models/enums/SupportedLanguages';
import AlertUtil from '../utils/AlertUtil';
import Utils from '../utils/Utils';
import translator from '../theme/translator.json';

class ErrorService {
  private static currentLanguage = SupportedLanguages.DEFAULT;

  static handleError = async (error: any, dispatch: any, language?: SupportedLanguages) => {
    console.log(error);

    if (language) ErrorService.currentLanguage = language;

    if (error instanceof FirebaseError) {
      return ErrorService.handleFirebaseError(error, dispatch);
    }
    return ErrorService.handleGeneralError(error, dispatch);
  };

  static handleFirebaseError = async (error: FirebaseError, dispatch: any) => {
    switch (error.code) {
      case 'auth/wrong-password':
      case 'auth/user-not-found': {
        const message = await Utils.getTranslation(this.currentLanguage, translator.errorMessages.firebase.auth.userNotFound);
        if (message) AlertUtil.createErrorAlert(message as string, dispatch);
        break;
      }
      case 'auth/network-request-failed': {
        const message = await Utils.getTranslation(this.currentLanguage, translator.errorMessages.firebase.auth.networkRequestFailed);
        if (message) AlertUtil.createErrorAlert(message as string, dispatch);
        break;
      }
      case 'auth/email-already-in-use': {
        const message = await Utils.getTranslation(this.currentLanguage, translator.errorMessages.firebase.auth.emailAlreadyInUse);
        if (message) AlertUtil.createErrorAlert(message as string, dispatch);
        break;
      }
      default: {
        const message = await Utils.getTranslation(this.currentLanguage, translator.errorMessages.general.unknown);
        if (message) AlertUtil.createErrorAlert(message as string, dispatch);
        break;
      }
    }
  };

  static handleGeneralError = async (error: Error, dispatch: any) => {
    const message = await Utils.getTranslation(this.currentLanguage, translator.errorMessages.general.unknown);
    if (message) AlertUtil.createErrorAlert(message as string, dispatch);
  };
}

export default ErrorService;
