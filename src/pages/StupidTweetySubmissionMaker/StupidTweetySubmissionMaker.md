I wrote a web application that detects faces in a picture and draws over the region. Here's why and how.

A few people I know created a subreddit where users submitted images where the subject's head was replaced by (for whatever reason) Tweety bird's. I wanted to automate the process of manually replcaing the heads, so I looked into using opencv's object detection to do the job.

I also wanted to learn more about AWS and about how much I can do without using a "real" backend server.

I spent a few hours figuring out how to [statically compile OpenCV][0] inside an AMI instance so that my lambda functions can use OpenCV features. I wrote a lambda function that retrieves an image from my S3 bucket, detects the faces, and responds with the coordinates and sizes of the faces.

On the browser, I use the HTML5 File API to upload a user dragged image to my S3 bucket with a generated guid as a key. Then I invoke my lambda function, passing it the guid, and get the coordinates.

The image is drawn onto a HTML5 canvas, while the Tweety heads are loaded in an invisible image element. The canvas then draws the Tweety heads on top of the detected faces.

[0]: https://aws.amazon.com/blogs/compute/nodejs-packages-in-lambda/
