package com.rncodetest;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;

public class NativeInfo extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;

  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";

  NativeInfo(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }
  @Override
  public String getName() {
    return "NativeInfo";
  }
  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    String buildConfig = BuildConfig.BUILD_TYPE.toLowerCase();
    String serviceKey = reactContext.getString(R.string.service_key_production);
    constants.put("ENVIRONMENT", buildConfig);
    if (buildConfig=="debug") { 
      serviceKey = reactContext.getString(R.string.service_key);
    } 
    constants.put("SERVICE_KEY", serviceKey);
    return constants;
  }
  @ReactMethod
  public void showServiceKey(Callback callback) {
    String serviceKey = reactContext.getString(R.string.service_key);
    callback.invoke(serviceKey);
  }
}