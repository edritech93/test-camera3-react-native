import {Platform, Alert} from 'react-native';
import {
  PERMISSIONS,
  openSettings,
  check,
  request,
  RESULTS,
} from 'react-native-permissions';

const MSG_PERMISSION_BLOCKED =
  'Permission is blocked, enable manually on setting';
const MSG_PERMISSION_UNAVAILABLE = 'Permission Unavailable';

export function getPermissionCamera(): Promise<boolean> {
  return new Promise(function (resolve, reject) {
    if (Platform.OS === 'ios') {
      check(PERMISSIONS.IOS.CAMERA)
        .then(status => {
          if (status === RESULTS.GRANTED) {
            resolve(true);
          } else if (status === RESULTS.DENIED) {
            request(PERMISSIONS.IOS.CAMERA)
              .then(() => resolve(true))
              .catch(error => reject(error));
          } else if (status === RESULTS.UNAVAILABLE) {
            _showAlertUnavailable('Camera');
          } else {
            _showAlertBlocked('Camera');
          }
        })
        .catch(error => reject(error));
    } else if (Platform.OS === 'android') {
      check(PERMISSIONS.ANDROID.CAMERA)
        .then(status => {
          if (status === RESULTS.GRANTED) {
            resolve(true);
          } else if (status === RESULTS.DENIED) {
            request(PERMISSIONS.ANDROID.CAMERA)
              .then(() => resolve(true))
              .catch(error => reject(error));
          } else if (status === RESULTS.UNAVAILABLE) {
            _showAlertUnavailable('Camera');
          } else {
            _showAlertBlocked('Camera');
          }
        })
        .catch(error => reject(error));
    } else {
      reject(MSG_PERMISSION_BLOCKED);
    }
  });
}

export function getPermissionReadStorage(): Promise<boolean> {
  return new Promise(function (resolve, reject) {
    if (Platform.OS === 'ios') {
      check(PERMISSIONS.IOS.PHOTO_LIBRARY)
        .then(status => {
          if (status === RESULTS.GRANTED) {
            resolve(true);
          } else if (status === RESULTS.DENIED) {
            request(PERMISSIONS.IOS.PHOTO_LIBRARY)
              .then(() => resolve(true))
              .catch(error => reject(error));
          } else if (status === RESULTS.UNAVAILABLE) {
            _showAlertUnavailable('Library');
          } else {
            _showAlertBlocked('Library');
          }
        })
        .catch(error => reject(error));
    } else if (Platform.OS === 'android') {
      check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
        .then(status => {
          if (status === RESULTS.GRANTED) {
            resolve(true);
          } else if (status === RESULTS.DENIED) {
            request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
              .then(() => resolve(true))
              .catch(error => reject(error));
          } else if (status === RESULTS.UNAVAILABLE) {
            _showAlertUnavailable('Read Storage');
          } else {
            _showAlertBlocked('Read Storage');
          }
        })
        .catch(error => reject(error));
    } else {
      reject(MSG_PERMISSION_BLOCKED);
    }
  });
}

export function getPermissionWriteStorage(): Promise<boolean> {
  // NOTE: Android Only
  return new Promise(function (resolve, reject) {
    if (Platform.OS !== 'android') {
      resolve(true);
      return;
    }
    check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
      .then(status => {
        if (status === RESULTS.GRANTED) {
          resolve(true);
        } else if (status === RESULTS.DENIED) {
          request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
            .then(() => resolve(true))
            .catch(error => reject(error));
        } else if (status === RESULTS.UNAVAILABLE) {
          _showAlertUnavailable('Write Storage');
        } else {
          _showAlertBlocked('Write Storage');
        }
      })
      .catch(error => reject(error));
  });
}

function _showAlertBlocked(message: string = '') {
  Alert.alert(
    'Information',
    `${message} ${MSG_PERMISSION_BLOCKED}`,
    [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'Setting',
        onPress: () => openSettings(),
      },
    ],
    {cancelable: true},
  );
}

function _showAlertUnavailable(message: string = '') {
  Alert.alert(
    'Information',
    `${message} ${MSG_PERMISSION_UNAVAILABLE}`,
    [
      {
        text: 'Ok',
        onPress: () => {},
      },
    ],
    {cancelable: true},
  );
}
