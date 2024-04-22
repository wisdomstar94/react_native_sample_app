# react_native_sample_app
React Native 연구용 프로젝트 입니다.

<br />

# Splash Screen 에 대하여
android 12 버전부터 기본으로 OS단에서 Splash Screen 이 제공되는데 이러한 기본 Splash Screen 에는 단순 색상의 배경과 중앙에 표시되는 아이콘으로 구성됩니다. 그러므로 12 버전 이하 및 이상 버전 안드로이드 기기와 ios 기기에서 일관성 높은 Splash Screen 을 보여주기 위해서는 모든 OS 에서 단순 색상의 배경에 아이콘이 중앙에 배치된 커스텀 Splash Screen 이 구동될 때 표시되게 하는 것이 좋은 선택일 수 있습니다. 본 프로젝트에는 이와 같은 설정을 직접 구현한 상태이며, Splash Screen 의 배경 색상과 중앙에 배치된 아이콘 이미지에 대한 커스터마이징을 하는 방법을 아래에 기술하였습니다. <br />
(※ [react-native-splash-screen](https://www.npmjs.com/package/react-native-splash-screen) 또는 [react-native-bootsplash
](https://www.npmjs.com/package/react-native-bootsplash) 와 같은 라이브러리를 사용하여 splash screen 을 구성하는 방법도 있지만, 추후 업데이트나 유지보수를 고려한다면 서드파티 라이브러리는 최대한 지양하는 것이 좋다고 생각합니다.)

## Splash Screen 배경 색상 커스터마이징 (Android)
### 1. `android/app/src/main/res/values/colors.xml` 에서 아래와 같이 수정합니다.
```
<resources>
   ...
   <color name="splash_init_bg_color">#127AF5</color> // <-- 이 부분을 수정하세요.
   ...
</resources>
```

## Splash Screen 배경 색상 커스터마이징 (IOS)
### 1. `ios/react_native_sample_app/AppDelegate.mm` 에서 아래와 같이 수정합니다.
![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/c89c29a0-f55e-4c1d-bc4d-b7ee3514fe40)

위 이미지에서 빨간색 박스로 표시한 colorWithRed, green, blue 의 값을 RGB(0~1.0) 값으로 수정하면 되는데, 아래 사이트에 접속하면 특정 포맷의 색상 값을 다양한 색상 포맷으로 변환시켜 줍니다. 그 중에서 `sRGB   0-1.0` 에 해당하는 값을 사용하면 됩니다.
https://www.easyrgb.com/en/convert.php#inputFORM 