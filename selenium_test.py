from time import sleep
from selenium import webdriver
from pydarknet import Detector, Image
import cv2
from firebase import firebase
from time import sleep

net = Detector(bytes("cfg/yolov3.cfg", encoding="utf-8"), bytes("weights/yolov3.weights", encoding="utf-8"), 0,
               bytes("cfg/coco.data", encoding="utf-8"))
DRIVER = 'chromedriver'
driver = webdriver.Chrome(DRIVER)
driver.get('https://devtalks.netlify.com')
sleep(5)
firebase = firebase.FirebaseApplication('https://swarm-3a67d.firebaseio.com/', None)
locin = [0,0]

while True:

    screenshot = driver.save_screenshot('my_screenshot.png')


    frame = cv2.imread('my_screenshot.png')
        # Only measure the time taken by YOLO and API Call overhead
    dark_frame = Image(frame)
    results = net.detect(dark_frame)

    for cat, score, bounds in results:
        if cat.decode("utf-8") == 'person':
            x, y, w, h = bounds
            cv2.rectangle(frame, (int(x - w / 2), int(y - h / 2)), (int(x + w / 2), int(y + h / 2)),
                          (255, 0, 0))
            cv2.putText(frame, str(cat.decode("utf-8")), (int(x), int(y)), cv2.FONT_HERSHEY_COMPLEX, 1,
                        (255, 255, 0))

            whole_direct = firebase.get('/drones', 1)
            latt = whole_direct['currentloc']['lat']
            longg = whole_direct['currentloc']['lng']
            print(latt)
            if (locin[0] == latt and locin[1] == longg):
                continue
            else:
                x = [latt, longg]
                firebase.put('/location', 'peopleloc', {'lng': str(longg), 'lat': str(latt)})


        else:
            continue

            # x, y, w, h = bounds
            # cv2.rectangle(frame, (int(x - w / 2), int(y - h / 2)), (int(x + w / 2), int(y + h / 2)),
            #               (255, 0, 0))
            # cv2.putText(frame, str(cat.decode("utf-8")), (int(x), int(y)), cv2.FONT_HERSHEY_COMPLEX, 1,
            #             (255, 255, 0))






