//
//  NativeInfoIos.m
//  RNCodeTest
//
//  Created by Abdy malik Mulky on 17/08/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "NativeInfoIos.h"
#import <React/RCTLog.h>

@implementation NativeInfoIos

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(showServiceKey:(RCTResponseSenderBlock)callback )
{
  callback(@[[NSNull null], [[[NSBundle mainBundle] infoDictionary] objectForKey:@"ServiceKey"]]);
}

@end
