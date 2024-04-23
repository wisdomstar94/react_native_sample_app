# react_native_sample_app
React Native 연구용 프로젝트 입니다.

<br />

# Splash Screen 에 대하여
android 12 버전부터 기본으로 OS단에서 Splash Screen 이 제공되는데 이러한 기본 Splash Screen 에는 단순 색상의 배경과 중앙에 표시되는 아이콘으로 구성됩니다. 그러므로 12 버전 이하 및 이상 버전 안드로이드 기기와 ios 기기에서 일관성 높은 Splash Screen 을 보여주기 위해서는 모든 OS 에서 단순 색상의 배경에 아이콘이 중앙에 배치된 커스텀 Splash Screen 이 구동될 때 표시되게 하는 것이 좋은 선택일 수 있습니다. 본 프로젝트에는 이와 같은 설정을 직접 구현한 상태이며, Splash Screen 의 배경 색상과 중앙에 배치된 아이콘 이미지에 대한 커스터마이징을 하는 방법을 아래에 기술하였습니다. <br />
(※ [react-native-splash-screen](https://www.npmjs.com/package/react-native-splash-screen) 또는 [react-native-bootsplash
](https://www.npmjs.com/package/react-native-bootsplash) 와 같은 라이브러리를 사용하여 splash screen 을 구성하는 방법도 있지만, 추후 업데이트나 유지보수를 고려한다면 서드파티 라이브러리는 최대한 지양하는 것이 좋다고 생각합니다.)

<br />

## Splash Screen 배경 색상 커스터마이징

### 1. (Android) `android/app/src/main/res/values/colors.xml` 에서 아래와 같이 수정합니다.
```
<resources>
   ...
   <color name="splash_init_bg_color">#127AF5</color> // <-- 이 부분을 수정하세요.
   ...
</resources>
```
### 2. (IOS) `ios/react_native_sample_app/AppDelegate.mm` 에서 아래와 같이 수정합니다.
![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/c89c29a0-f55e-4c1d-bc4d-b7ee3514fe40)

위 이미지에서 빨간색 박스로 표시한 colorWithRed, green, blue 의 값을 RGB(0~1.0) 값으로 수정하면 되는데, 아래 사이트에 접속하면 특정 포맷의 색상 값을 다양한 색상 포맷으로 변환시켜 줍니다. 그 중에서 `sRGB   0-1.0` 에 해당하는 값을 사용하면 됩니다.
https://www.easyrgb.com/en/convert.php#inputFORM 

<br />

## Splash Screen 중앙 아이콘 커스터마이징 
### 1. 1024 x 1024 사이즈의 Splash Screen 의 중앙에 표시할 아이콘 이미지를 준비합니다.
### 2. `https://www.appicon.co/#image-sets` 에 접속합니다.
### 3. 좌측에 Click or drag ... 표시 영역을 클릭하여 원하는 Splash Screen icon 이미지를 등록합니다.
![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/25281e00-be60-4cd3-825c-a6cbfab0dd4e)
### 4. 등록된 이미지의 이름변경 아이콘을 클릭합니다.
![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/0a2c49f1-4b21-4109-b5e9-4e748b557d92)
### 5. 이미지 이름을 아래와 같이 수정합니다.
![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/32ae91f3-9bbb-411b-a1c6-fb1b64236421)
### 6. Generate 버튼을 클릭하면 ImageSet zip 파일이 다운로드 됩니다.
![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/db904a50-8b52-4e78-a2db-df38412d756b)
### 7. (Android) 아래와 같이 ImageSet 에 포함된 drawable-* 밑의 이미지들을 본 프로젝트의 android/app/src/main/res/mipmap-* 밑으로 복사(덮어씌기) 합니다.
![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/93ca461e-1254-4931-93e5-ce030ae671fa)
### 8. (IOS) 아래와 같이 ImageSet 에 포함된 ios 이미지들을 본 프로젝트의 ios/react_native_sample_app/Images.xcassets/SplashInitIcon.imageset/ 밑으로 복사(덮어씌기) 합니다.
![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/5ccd957b-b57e-4db0-b156-8cec80f644fd)

<br />

# App Icon 에 대하여
android 13 버전 부터 앱 테마 아이콘을 지원하기 시작했습니다. 테마에 따라 앱 아이콘의 배경색상과 전경아이콘 색상도 변경되도록 지원하는 것이 가능해졌는데, 이를 위해서는 android app 에 적응형 아이콘을 적용해야 합니다. 아래에 앱 아이콘을 커스터마이징 할 수 있는 방법에 대해 기재하였습니다.

## App Icon 커스터마이징 (Android)

### 1. 512 x 512 사이즈의 App Icon 의 배경이미지와 App Icon 의 전경이미지를 준비합니다.
예를 들어 다음과 같이 준비합니다.
- ic_launcher_background.png<br />
![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/2bc46474-9c7e-4a98-831f-ffb9d0279eed)
- ic_launcher_foreground.svg<br />
![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/4a0a8cfc-9d4a-4d02-b04d-987190e076c1)<br />
(투명한 배경에 중앙에 텍스트가 위치한 이미지 입니다. 상하좌우 여백이 이정도 존재해야 합니다.)

### 2. Android Studio 를 열고 android/ 폴더를 엽니다.

### 3. res 폴더에 오른쪽 마우스 클릭 후 'New' -> 'Image Asset' 을 클릭합니다. 
![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/eff2a020-0cf3-437d-9a34-aadef7bc23a5)

### 4. 앱 아이콘을 등록합니다.
![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/63503442-00ab-416a-b6d1-1cedfae765e6)
위 이미지와 같이 icon type 은 "Launcher Icons (Adaptive and Legacy)" 를 선택한 후 Foreground Layer, Background Layer 에 해당하는 이미지를 등록해주세요. 그리고 옆에 미리보기가 표시되는데, 둥근 원안에 전경(foreground) 이미지가 온전히 들어가 있는지 확인해주시고, 만약 둥근 원 밖을 초과했을 경우 전경 이미지의 상하좌우 여백을 더 준 이미지로 교체해야 합니다. 모두 완료가 되었다면 Next 버튼을 클릭후 Finish 버튼을 클릭해주세요.

### 5. `android/app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml` 파일을 아래와 같이 수정합니다.
```
<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@drawable/ic_launcher_background"/>
    <foreground android:drawable="@drawable/ic_launcher_foreground"/>
    <monochrome android:drawable="@drawable/ic_launcher_foreground"/> // <-- 이 부분을 추가해주세요.
</adaptive-icon>
```

### 6. `android/app/src/main/res/mipmap-anydpi-v26/ic_launcher_round.xml` 파일을 아래와 같이 수정합니다.
```
<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@drawable/ic_launcher_background"/>
    <foreground android:drawable="@drawable/ic_launcher_foreground"/>
    <monochrome android:drawable="@drawable/ic_launcher_foreground"/> // <-- 이 부분을 추가해주세요.
</adaptive-icon>
```
