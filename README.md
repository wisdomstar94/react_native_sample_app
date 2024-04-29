# react_native_sample_app
React Native 연구용 프로젝트 입니다.

<br />
<br />
<br />

# Splash Screen 에 대하여 (배경 + 아이콘)
android 12 버전부터 기본으로 OS단에서 Splash Screen 이 제공되는데 이러한 기본 Splash Screen 에는 단순 색상의 배경과 중앙에 표시되는 아이콘으로 구성됩니다. 그러므로 12 버전 이하 및 이상 버전 안드로이드 기기와 ios 기기에서 일관성 높은 Splash Screen 을 보여주기 위해서는 모든 OS 에서 단순 색상의 배경에 아이콘이 중앙에 배치된 커스텀 Splash Screen 이 구동될 때 표시되게 하는 것이 좋은 선택일 수 있습니다. 본 프로젝트에는 이와 같은 설정을 직접 구현한 상태이며, Splash Screen 의 배경 색상과 중앙에 배치된 아이콘 이미지에 대한 커스터마이징을 하는 방법을 아래에 기술하였습니다. <br />
(※ [react-native-splash-screen](https://www.npmjs.com/package/react-native-splash-screen) 또는 [react-native-bootsplash
](https://www.npmjs.com/package/react-native-bootsplash) 와 같은 라이브러리를 사용하여 splash screen 을 구성하는 방법도 있지만, 추후 업데이트나 유지보수를 고려한다면 서드파티 라이브러리는 최대한 지양하는 것이 좋다고 생각합니다.)

<br />

## Splash Screen 배경 색상 및 중앙 아이콘 설정하기 (Android)

### 1. `android/app/src/main/res/values/colors.xml` 파일을 아래와 같이 작성합니다.
```
<?xml version="1.0" encoding="utf-8"?>
<resources>
   ...
   <color name="splash_init_bg_color">#127AF5</color>
   ...
</resources>
```

### 2. `android/app/src/main/res/values/styles.xml` 파일을 아래와 같이 작성합니다.
```
<?xml version="1.0" encoding="utf-8"?>
<resources>
    ...
    <!-- ### 기본 Splash Screen 화면에 대한 테마 설정 ### -->
    <style name="Theme.App.CustomSplash" parent="Theme.App">
        <item name="android:windowBackground">@drawable/splash_init_icon</item>
        <item name="postSplashScreenTheme">@style/Theme.App</item>
        <!-- android 12 버전 이상부터 적용되는 옵션들은 ./values-v31/styles.xml 의 "<style name="Theme.App.CustomSplash" parent="Theme.App">...</style>" 에 기재함 -->
    </style>

    <!-- ### 기본 Splash Screen 화면이 종료된 후 바로 아래 테마로 전환됨 ### -->
    <style name="Theme.App" parent="Theme.AppCompat.DayNight.NoActionBar">
        <item name="android:editTextBackground">@drawable/rn_edit_text_material</item>
        <item name="android:windowBackground">@color/splash_init_bg_color</item>
    </style>
    ...
</resources>
```

### 3. `android/app/src/main/res/values-v31/styles.xml` 파일을 아래와 같이 작성합니다.
```
<?xml version="1.0" encoding="utf-8"?>
<resources>
    ...
    <style name="Theme.App.CustomSplash" parent="Theme.App">
        <item name="android:windowBackground">@drawable/splash_init_icon</item>
        <item name="postSplashScreenTheme">@style/Theme.App</item>
        <item name="android:windowSplashScreenBackground">@color/splash_init_bg_color</item>
        <item name="android:windowSplashScreenAnimatedIcon">@drawable/splash_init_icon</item>
    </style>
    ...
</resources>
```

### 4. `android/app/src/main/res/values/dimens.xml` 파일을 아래와 같이 작성합니다.
```
<?xml version="1.0" encoding="utf-8"?>
<resources>
    ...
    <dimen name="splash_init_icon_size">160dp</dimen>
    ...
</resources>
```

### 5. 1024 x 1024 사이즈의 Splash Screen 의 중앙에 표시할 아이콘 이미지를 준비합니다.

### 6. 아래 사이트를 이용하여 splash 아이콘에 대한 image set 을 다운 받습니다.
https://www.appicon.co/#image-sets <br />
이미지 이름은 splash_init_icon 으로 설정해주세요.

### 7. 아래와 같이 ImageSet 에 포함된 drawable-* 밑의 이미지들을 본 프로젝트의 android/app/src/main/res/mipmap-* 밑으로 복사합니다.
![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/93ca461e-1254-4931-93e5-ce030ae671fa)

### 8. `android/app/src/main/res/drawable/splash_init_icon.xml` 파일을 아래와 같이 작성합니다.
```
<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
  <item 
    android:drawable="@color/splash_init_bg_color" />
  <item
    android:width="@dimen/splash_init_icon_size"
    android:height="@dimen/splash_init_icon_size"
    android:drawable="@mipmap/splash_init_icon"
    android:gravity="center" />
</layer-list>
```

### 9. `android/app/build.gradle` 에 아래와 같이 종속성을 추가합니다.
```
dependencies {
    // The version of react-native is set by the React Native Gradle Plugin
    implementation("com.facebook.react:react-android")
    implementation("androidx.core:core-splashscreen:1.0.1") // 이 부분 추가!!

    if (hermesEnabled.toBoolean()) {
        implementation("com.facebook.react:hermes-android")
    } else {
        implementation jscFlavor
    }
}
```

### 10. `android/app/src/main/AndroidManifest.xml` 파일을 아래와 같이 수정합니다.
```
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
      android:name=".MainApplication"
      android:label="@string/app_name"
      android:icon="@mipmap/ic_launcher"
      android:roundIcon="@mipmap/ic_launcher_round"
      android:allowBackup="false"
      android:theme="@style/Theme.App"> // 이 부분 추가 (또는 수정)
      <activity
        android:name=".MainActivity"
        android:label="@string/app_name"
        android:configChanges="keyboard|keyboardHidden|orientation|screenLayout|screenSize|smallestScreenSize|uiMode"
        android:launchMode="singleTask"
        android:windowSoftInputMode="adjustResize"
        android:exported="true"
        android:theme="@style/Theme.App.CustomSplash"> // 이 부분 추가 (또는 수정)
        <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
      </activity>
    </application>
</manifest>
```

<br />

## Splash Screen 배경 색상 및 중앙 아이콘 설정하기 (IOS)

### 1. `ios/react_native_sample_app/AppDelegate.mm` 파일에서 아래와 같이 수정합니다.
```
return [super application:application didFinishLaunchingWithOptions:launchOptions];
```
이 부분을
```
BOOL result = [super application:application didFinishLaunchingWithOptions:launchOptions];
self.window.rootViewController.view.backgroundColor = [UIColor colorWithRed:0.0705 green:0.47843 blue:0.96078 alpha:1.00];
return result;
```
이렇게 수정합니다. (colorWithRed, green, blue 에는 splash 화면의 배경 색상에 대한 rgb 값을 넣으면 됩니다.) <br />
아래 사이트에 접속하면 특정 포맷의 색상 값을 다양한 색상 포맷으로 변환시켜 줍니다. 그 중에서 `sRGB   0-1.0` 에 해당하는 값을 사용하면 됩니다.
https://www.easyrgb.com/en/convert.php#inputFORM 

### 2. `ios/` 폴더를 xcode 로 엽니다.

### 3. 다음과 같이 "SplashInitIcon" 라는 이름의 image set 을 추가합니다.
![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/cd0cc797-6aab-45c1-84f0-3a397f395529)

### 4. ImageSet 에 포함된 ios 이미지들을 사이즈에 맞게 등록해줍니다.
![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/90788c8f-ed49-4f1e-b10e-6640ce6d4925)

### 5. LaunchScreen.storyboard 에서 다음과 같이 이미지 뷰를 중앙에 배치합니다.
![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/8dab1931-707e-4c72-bba6-80ba978b13b5)

### 6. 아까 등록한 SplashInitIcon 이미지를 선택합니다.
![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/4dfd803b-1360-46a2-ac28-b4024622811c)

### 7. Image View 를 클릭 후 아래와 같이 수평, 수직 constraint 를 추가하여 어떤 기기던 중앙에 위치할 수 있도록 설정합니다.
![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/45bc79ed-d31f-4585-a823-e1cf443f4ae3)

<br />
<br />
<br />

# App Icon 에 대하여
android 13 버전 부터 앱 테마 아이콘을 지원하기 시작했습니다. 테마에 따라 앱 아이콘의 배경색상과 전경아이콘 색상도 변경되도록 지원하는 것이 가능해졌는데, 이를 위해서는 android app 에 적응형 아이콘을 적용해야 합니다. 아래에 앱 아이콘을 커스터마이징 할 수 있는 방법에 대해 기재하였습니다.

<br />

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

<br />

## App Icon 커스터마이징 (IOS)

### 1. 1024 x 1024 사이즈의 App Icon 이미지를 준비합니다.

### 2. `https://www.appicon.co/#app-icon` 에 접속하여 아이콘 이미지를 첨부한 후 "Generate" 버튼을 클릭하면 AppIcons.zip 파일이 다운로드 됩니다.

### 3. zip 파일을 압축 해제 후, `Assets.xcassets/AppIcon.appiconset/` 폴더 밑에 있는 다양한 사이즈들의 이미지들이 있는 것을 확인 할 수 있습니다.

### 4. ios 폴더를 xcode 로 실행합니다.

### 5. xcode 에서 Images.xcassets -> AppIcon 으로 이동합니다.
![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/6886acfb-4d79-49d4-a687-5049f4b2ea0d)

### 6. 각 사이즈에 맞춰 이미지들을 등록합니다.
![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/93250db8-c010-4ceb-8abc-29bbcb7eb499)

<br />
<br />
<br />

# 패키지명에 대하여
패키지명은 앱의 고유 식별자 입니다. android 및 ios 는 패키지명을 통해 앱을 식별합니다. 패키지명은 다른 앱과 중복되지 않도록 설정해야 합니다. 패키지명을 변경하는 방법은 아래애 기재하였습니다.

<br />

## 패키지명 변경 방법 (Android)
### 1. android/ 폴더를 android studio 로 열어줍니다.

### 2. 아래와 같이 변경하고자 하는 패키지명의 이름을 변경합니다.
![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/17d46db9-d80d-435d-b102-87bd8126bb35)

### 3. build.gradle 파일에 있는 기존 패키지명도 변경된 패키지명으로 수정 후 "Sync Now" 버튼을 클릭합니다.
![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/578d01e9-eb78-4b6e-ad96-a1fdbe71649a)

<br />

## 패키지명 변경 방법 (IOS)
### 1. ios/ 폴더를 xcode 로 열어줍니다.

### 2. 아래와 같이 순서대로 클릭 후 "Bundle Identifier" 부분을 원하는 패키지명으로 입력해주세요.
![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/7ff3939f-b1ba-4a39-bc60-bd181c3a4b62)

<br />
<br />
<br />

# 앱 이름에 대하여
앱스토어에서 표시되는 앱의 이름을 설정하는 방법에 대해 다음과 같이 기재합니다.

<br />

## 앱 이름 변경 방법 (Android)
### 1. strings.xml 의 app_name 에 영문일 때 표시될 앱 이름을 작성합니다.
![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/29707453-115b-4d27-9524-fe60b97921fe)

### 2. res 폴더 밑에 values-ko/string.xml 파일을 생성 후 아래처럼 한글일 때 표시될 앱 이름을 작성합니다.
![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/a5708613-9372-4d8b-b300-c7d65c455050)

<br />

## 앱 이름 변경 방법 (IOS)

### 1. korean locale 추가
![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/1209176d-f049-4668-8540-e3ec11fcb812)

![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/d421b586-6623-42b7-81db-18ed090c2465)

![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/9854ad2f-e525-4c6e-b08f-3dfe98fc689d)

### 2. 각 언어마다 앱 이름에 대한 key, value 작성
![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/d07eeadb-ac94-48ef-8731-d23b52656899)

<br />

## 앱 이름 변경 방법 (공통)
### 1. app.json 의 displayName 을 변경합니다. (공통)
![image](https://github.com/wisdomstar94/react_native_sample_app/assets/93423564/5cdb8980-5c20-4518-8873-3909871a0633)


