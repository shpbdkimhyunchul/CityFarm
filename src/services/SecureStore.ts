import * as Keychain from 'react-native-keychain';

// 보안영역(iOS: keychain, Android: keystore) 저장, 조회 삭제 기능

// 저장
export async function save(key: string, value: string): Promise<boolean> {
    // Store
    let result = await Keychain.setGenericPassword('Preference', value, { service: key });
    if (result) {
        return true;
    } else {
        return false;
    }
}
// 조회
export async function getValueFor(key: string): Promise<string>{
    const result = await Keychain.getGenericPassword({ service: key });
    if (result) {
        return result.password;
    } else {
        return "";
    }
}
// 삭제
export async function reset(key: string): Promise<boolean> {
    let result = await Keychain.resetGenericPassword({ service: key });
    return result;
}