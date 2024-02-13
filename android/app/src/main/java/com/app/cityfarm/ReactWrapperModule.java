package com.app.cityfarm;
import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class ReactWrapperModule extends ReactContextBaseJavaModule   {
    private final ReactApplicationContext reactContext;

    public ReactWrapperModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "ReactWrapperModule";
    }

}
