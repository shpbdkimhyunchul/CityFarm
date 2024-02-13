package com.app.cityfarm;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class AppFinishModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    AppFinishModule(ReactApplicationContext context){
        super(context);
        this.reactContext = context;
    }


    @Override
    public String getName() {
        return "AppFinishModule";
    }


    @ReactMethod
    public void finish() {
        Log.d("shpbd=finish","finish");
        Objects.requireNonNull(getCurrentActivity()).moveTaskToBack(true);
        getCurrentActivity().finishAndRemoveTask();
        android.os.Process.killProcess(android.os.Process.myPid());
    }


    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("SHORT", Toast.LENGTH_SHORT);
        constants.put("LONG", Toast.LENGTH_LONG);

        return super.getConstants();
    }
}
