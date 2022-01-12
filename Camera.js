import React, { Component, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import * as Permissions from "expo-permissions";
import { Icon, Button } from "native-base";

export const CameraComponent = () => {
  const [faceSquare, setFaceSquare] = useState({});
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const allowCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  if (hasPermission) {
    return (
      <View style={{ width: "100%", flex: 1 }}>
        <Camera
          type={Camera.Constants.Type.front}
          style={{ height: 500, width: "100%" }}
          onFacesDetected={(res) => {
            if (res.faces[0]) {
              setFaceSquare({
                width: res.faces[0].bounds.size.width,
                height: res.faces[0].bounds.size.height,
                marginLeft: res.faces[0].bounds.origin.x,
                marginTop: res.faces[0].bounds.origin.y,
                smillingProbability: res.faces[0].smilingProbability,
              });
            }
            if (res.faces.length == 0) {
              setFaceSquare({});
            }
          }}
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.fast,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
            runClassifications: FaceDetector.FaceDetectorClassifications.none,
            minDetectionInterval: 500,
            tracking: true,
          }}
        >
          {Object.keys(faceSquare) ? (
            <View>
              <View
                style={{
                  borderWidth: 2,
                  borderColor:
                    faceSquare.smillingProbability > 0.7 ? "green" : "red",
                  borderStyle: "solid",
                  width: faceSquare.width,
                  height: faceSquare.height,
                  marginLeft: faceSquare.marginLeft,
                  marginTop: faceSquare.marginTop,
                }}
              ></View>
              {faceSquare.smillingProbability > 0.7 ? (
                <Button
                  style={{
                    backgroundColor: "#007AFF",
                    width: 60,
                    height: 50,
                    alignSelf: "center",
                    marginTop: 10,
                  }}
                >
                  <Icon active name="smile" type="FontAwesome5" />
                </Button>
              ) : null}
            </View>
          ) : null}
        </Camera>

        <View style={{ width: "100%", flexDirection: "row", marginTop: 20 }}>
          <View style={{ width: "50%", alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>Happy</Text>
          </View>
          <View style={{ width: "50%", alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>
              {faceSquare
                ? (faceSquare.smillingProbability * 100).toFixed(2)
                : 0}
              %
            </Text>
          </View>
        </View>
        <View style={{ width: "100%", flexDirection: "row", marginTop: 20 }}>
          <View style={{ width: "50%", alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>Sad</Text>
          </View>
          <View style={{ width: "50%", alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>
              {faceSquare
                ? (Math.abs(faceSquare.smillingProbability - 1) * 100).toFixed(
                    2
                  )
                : 0}
              %
            </Text>
          </View>
        </View>
        <View style={{ width: "100%", flexDirection: "row", marginTop: 20 }}>
          <View style={{ width: "50%", alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>Angry</Text>
          </View>
          <View style={{ width: "50%", alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>
              {faceSquare
                ? faceSquare.smillingProbability > 0.95
                  ? (
                      Math.abs(faceSquare.smillingProbability - 0.9) * 100
                    ).toFixed(2)
                  : (
                      Math.abs(faceSquare.smillingProbability - 0.7) * 100
                    ).toFixed(2)
                : 0}
              %
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button onPress={allowCamera} large>
        <Text>Allow Camera</Text>
      </Button>
    </View>
  );
};
