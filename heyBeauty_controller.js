require('dotenv').config();
const express = require('express');
const { execSync } = require('child_process');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path=require("path");
const { error } = require('console');
const download = require('node-image-downloader');
const uploadFile= require("../../Middlewares/uploadFile");
const ImageDownloader = require('node-image-downloader/src/image-downloader');

const API_KEY = process.env.HEYBEAUTY_APIKEY;
console.log("api ", API_KEY);

const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    };
    
console.log("header", headers)
let result_data={};

exports.createJob= async (req, res) => {
  const params=req.body;
      console.log("request param:" , params);
        const response = await axios.post('https://heybeauty.ai/api/create-task', params, { headers });
        console.log(' Response:', response.data);
        // return response.data.data.uuid;

        if (response.data && response.data.data) {
          console.log('Response:', response.data);
          result_data = {
            url_uuid: response.data.data.uuid,
            user_img_url: response.data.data.user_img_url,
            cloth_img_url: response.data.data.cloth_img_url,
          }
          console.log("json file url",result_data) ;      
          res.status(200).json(result_data);  // Return the uuid in the response
      } else {
          res.status(400).json({ message: 'Invalid API response format' });
      }
         
      };

      // exports.uploadLink = async (req, res) => {
        // if (result_data.length == "undefined") {
        //   return res.status(500).json({ code: "-1", message: "First create new job." });
        // }
        // if (!req.file) {
        //   return res.status(400).json({ message: "No file uploaded" });
        // }
        // const request_data = `http://localhost:8080/v1/profile/${req.file.filename}`;
        // console.log("resquest data===", request_data);
        // console.log("resultdata===", result_data);
        // const response_data = await axios.put(result_data.cloth_img_url, request_data, { headers: headers });
    
        // // if (type === 'img') {
        // //   response_data = await axios.put(result_data.user_img_url, request_data, { headers: headers });
        // // } else if (type === 'cloth') {
        // //   respons_data = await axios.put(result_data.cloth_img_url, request_data, { headers: headers });
        // // } else {
        // //   return res.status(400).json({ message: 'Invalid upload type' });
        // // }
        // console.log("response==", response_data);
        // if (response_data.status != "200") {
        //   return res.status(500).json(response_data);
        // }
        // res.json({ status: true, data: response_data.statusText});
        //   };
    
      exports.uploadLink = async (req, res) => {
        if (result_data.length == "undefined") {
          return res.status(500).json({ code: "-1", message: "First create new job." });
        }
        if (!req.file) {
          return res.status(400).json({ message: "No file uploaded" });
        }
        const request_data = `http://localhost:8080/v1/profile/${req.file.filename}`;
        console.log("resquest data===", request_data);
        console.log("resultdata===", result_data);
        // const response_data = await axios.put(result_data.user_img_url, request_data, { headers: headers });
        if(req.url && req.url == "/upload/img"){
          response_data = await axios.put(result_data.user_img_url, request_data, { headers: headers });
        } else if
        (req.url && req.url =="/upload/cloth"){
          response_data = await axios.put(result_data.cloth_img_url, request_data, { headers:headers});
          console.log("response_data---", response_data)
        }else{
          console.log("error", error )
        }
        console.log("response==", response_data);
        if (response_data.status != "200") {
          return res.status(500).json(response_data);
        }
        res.json({ status: true, data: response_data.statusText});
          };
    

          exports.submitJob=async (req,res)=>{
            console.log('uuid======',result_data.url_uuid)

            const subResponse = await axios.post(
              'https://heybeauty.ai/api/submit-task',
              { "task_uuid": result_data.url_uuid },
              { headers:headers }
            );
            // const subResponse = await axios.post("https://heybeauty.ai/api/submit-task",result_data.url_uuid,{ headers: headers });
            console.log("subresponse==", subResponse)
              
          
              if (subResponse.data && subResponse.data.data) {
                console.log('Task submitted successfully.');
                res.json({ status: true, data: subResponse.data.data});
              } else {
                throw new Error('Failed to submit task: ' + JSON.stringify(subResponse.data));            
              }
            } 

            exports.checkStatus = async (req, res,outPaths) => {
              console.log('Uploaded files:', req.file);
              req.files;      
              // if (!req.files || !req.files.poseFile || !req.files.poseFile[0]) {
              //   return res.status(400).json({ error: 'Missing poseFile in request.' });
              // }
              const PoseDir = path.dirname(PoseFile.path)
              console.log("PoseeeDiirrrrr---",PoseDir,"\n")
        
               const baseDir = path.normalize(PoseDir+"/..");
               console.log("baseeSSSSSSSSSSSsDir-----", baseDir,"\n")
        
               const tryonFileDir = path.join(baseDir, 'tryonFile');
               console.log("tryonFileDir------->>", tryonFileDir,"\n")
        
               fs.mkdirSync(tryonFileDir, { recursive: true }); // Creates the folder if it doesn't exist
               const outTryonPath = path.join(process.cwd(), tryonFileDir);
               console.log('TryonFile Path:', outTryonPath);
              // const now = new Date();
              // const 
              // curr_timestamp= `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;
              // console.log(curr_timestamp); 
              // const outtryonPath = path.join(process.cwd(), `/public/upload/${curr_timestamp}/outtryonFile/`)
              
              // if (!result_data.url_uuid) {
              //   throw new Error("UUID is required to check the task status.");
              // }
              console.log("Checking status for UUID:", result_data.url_uuid);
              for (let i = 0; i < 30; i++) {
                await new Promise((resolve) => setTimeout(resolve, 18000)); // Wait 18 seconds
           
                // const response = await axios.post("https://heybeauty.ai/api/get-task-info",result_data.url_uuid,{ headers: headers });
                  const StatusResponse = await axios.post(
                    'https://heybeauty.ai/api/get-task-info',
                  { "task_uuid": result_data.url_uuid },
                    { header:headers }
                  );
                  console.log("staatussss-------->respp",StatusResponse)
                console.log("status response", StatusResponse.data)
                  if (StatusResponse.data || StatusResponse.data.data) {
                    const data = StatusResponse.data.data;
                    console.log(`Task status: ${data.status}`);
            
                    if (data.status === 'successed') {
                      // execSync(`curl -o ${outPosePath} ${data.user_img_url}`);
                      // execSync(`curl -o ${outImgPath} ${data.cloth_img_url}`);
                      execSync(`curl -o ${outTryonPath} ${data.tryon_img_url}`);
                      console.log('Task completed successfully.');
                      res.status(200).json({ message: 'Task completed successfully.' });
                             return;
                    } else if (data.status === 'failed') {
                      throw new Error('Task failed: ' + data.err_msg);
                    }
                  } else {
                    console.log('Task is still processing...');
                  }
                } 
              res.status(408).json({ error: 'Task timed out after multiple attempts.' });
            };
            



// exports.tryOn = async (req, res, outPaths) => {
//   const { outPosePath, outImgPath, outMaskPath } = outPaths;

//   try {
//     // Step 1: Create Job
//     const params = req.body || {};
//     console.log("params===>", params)
//     if (!params) {
//       return res.status(400).json({ message: 'Request body is empty. Please provide valid parameters.' });
//     }
//     console.log("Step 1: Creating job with params:", params);
//     const createResponse = await axios.post('https://heybeauty.ai/api/create-task', params, { headers });
//     if (!createResponse.data || !createResponse.data.data) {
//       return res.status(400).json({ message: 'Invalid API response format during job creation' });
//     }

//     console.log("createResponse===>",createResponse)

//     result_data = {
//       url_uuid: createResponse.data.data.uuid,
//       user_img_url: createResponse.data.data.user_img_url,
//       cloth_img_url: createResponse.data.data.cloth_img_url,
//     };
//     console.log("Job created successfully:", result_data);

//     // Step 2: Upload Image
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }
//     const request_data = `http://localhost:8080/v1/profile/${req.file.filename}`;
//     console.log("Uploading image with data:", request_data);

//     let uploadResponse;
//     if (req.url === "/upload/img") {
//       uploadResponse = await axios.put(result_data.user_img_url, request_data, { headers });
//     } else if (req.url === "/upload/cloth") {
//       uploadResponse = await axios.put(result_data.cloth_img_url, request_data, { headers });
//     } else {
//       return res.status(400).json({ message: "Invalid upload URL" });
//     }

//     console.log("Image uploaded successfully:", uploadResponse.statusText);

//     // Step 3: Submit Job
//     console.log("Step 3: Submitting job with UUID:", result_data.url_uuid);
//     const submitResponse = await axios.post(
//       'https://heybeauty.ai/api/submit-task',
//       { task_uuid: result_data.url_uuid },
//       { headers }
//     );
//     if (!submitResponse.data || !submitResponse.data.data) {
//       return res.status(500).json({ message: 'Failed to submit task' });
//     }
//     console.log("Job submitted successfully.");

//     // Step 4: Check Status
//     console.log("Step 4: Checking job status for UUID:", result_data.url_uuid);
//     for (let i = 0; i < 30; i++) {
//       await new Promise(resolve => setTimeout(resolve, 18000)); // Wait 18 seconds
//       const statusResponse = await axios.post(
//         'https://heybeauty.ai/api/get-task-info',
//         { task_uuid: result_data.url_uuid },
//         { headers }
//       );

//       if (statusResponse.data && statusResponse.data.data) {
//         const data = statusResponse.data.data;
//         console.log(`Task status: ${data.status}`);

//         if (data.status === 'successed') {
//           execSync(`curl -o ${outPosePath} ${data.user_img_url}`);
//           execSync(`curl -o ${outImgPath} ${data.cloth_img_url}`);
//           execSync(`curl -o ${outMaskPath} ${data.mask_img_url}`);
//           console.log('Task completed successfully.');
//           return res.status(200).json({ message: 'Task completed successfully.', data });
//         } else if (data.status === 'failed') {
//           throw new Error('Task failed: ' + data.err_msg);
//         }
//       } else {
//         console.log('Task is still processing...');
//       }
//     }

//     res.status(408).json({ message: 'Task timed out after multiple attempts.' });

//   } catch (error) {
//     console.error("Error in tryOn process:", error.message);
//     res.status(500).json({ message: error.message });
//   }
// };


exports.tryOn = async (req, res) => {
  // console.log(req)
    let params = {
      "user_img_name": "poseFile.jpg",
      "cloth_img_name": "clothFile.jpg",
      "category": "1",
      "caption": "red, t-shirt"
  }
const categoryMapping = {
  "Upper Body": "1",
   "Lower Body": "2",
   "Dress Body": "3",
  "Full Body": "4",
};
  let params_data= req.body.param ? JSON.parse(req.body.param) : params;
  console.log("parrrrr", params_data)

  let categoryValue = categoryMapping[params_data.category];
  if (categoryValue) {
      params_data.category = categoryValue;
  }else if (!params_data.category || !categoryMapping[params_data.category]) {
    params_data.category = "Unknown Category"; 
    console.error("Invalid or empty category!");
    return res.status(400).json({ message: "Please check your category is empty or invalid " });
  }

  console.log("Mapped Category:", params_data.category);
  console.log("parrrrr after mapping:", params_data);
   

// //     // console.log("Request params:", params);
    const response = await axios.post('https://heybeauty.ai/api/create-task', params_data, { headers });
    console.log("AAAAAAAAAAAAAAAAAAA------",response)
    if (response.data && response.data.data) {
      const result_data = {
        url_uuid: response.data.data.uuid,
        user_img_url: response.data.data.user_img_url,
        cloth_img_url: response.data.data.cloth_img_url,
      };
      console.log("Job created:", result_data);
      // res.status(200).json(result_data);  // Return the uuid in the response
    

//       // Steps 2upload files
       req.files;
      // console.log("Uploaded files:", req.files);
if (result_data.length == "undefined") {
  return res.status(500).json({ code: "-1", message: "First create new job." });
}
if (!req.files) {
  return res.status(400).json({ message: "No file uploaded" });
}
      const PoseFile = req.files.poseFile[0];
      const ClothFile = req.files.clothFile[0];
      // console.log("poseFile--->", PoseFile, ClothFile)
      if (!PoseFile || !ClothFile) {
        return res.status(400).json({ message: "Missing required images" });
      }
      var request_data_pose = PoseFile.path;
      var request_data_cloth = ClothFile.path;
      console.log("request_data_pose----->",request_data_pose,"\n",request_data_cloth,"\n")

      const upload_image= fs.createReadStream(request_data_pose )
      const upload_cloth= fs.createReadStream(request_data_cloth )
console.log("upload_image----->", upload_image,"\n",upload_cloth)
// console.log("resultdata===", result_data);


let response_data;
let response_data1;
console.log("aAAAPPiiiiiiiiiiii----->URl::::",req.url)
// if (req.url ) {
//   response_data= await axios.put(result_data.user_img_url, upload_image, { headers:headers });
//   response_data1 = await axios.put(result_data.cloth_img_url, upload_cloth, { headers: headers });
//   console.log("UUUUUUUUUUU--->",response_data);
//   console.log("ccccccccccccccccccc--->", response_data1)
// // }

try {
   response_data = await axios.put(result_data.user_img_url, upload_image, { headers: headers });
  console.log("UUUUUUUUUUU--->", response_data);

  if (response_data && response_data.status === 200) { // Check if response_data ran successfully
     response_data1 = await axios.put(result_data.cloth_img_url, upload_cloth, { headers: headers });
    console.log("ccccccccccccccccccc--->", response_data1);
  } else {
    return res.status(500).json({ code: "-1", message: "Failed to upload image"})
  }
} catch (error) {
  console.error("Error occurred:", error.message);
}
// console.log("response_data", response_data,"\n", response_data1);
res.json({ status: true, data: response_data.statusText});

if (response_data && response_data.status !== 200) {
  return res.status(500).json({ message: 'Error uploading images' });
}
console.log("Images uploaded successfully.");

      // // Step 3: Submit Job
      const subResponse = await axios.post('https://heybeauty.ai/api/submit-task', { "task_uuid": result_data.url_uuid }, { headers });
      console.log("Submit Response:", subResponse.data);

      if (subResponse.data && subResponse.data.data) {
        console.log('Task submitted successfully.');
      } else {
        throw new Error('Failed to submit task.');
      }

      // Step 4: Check Task Status

  
      if (!result_data.url_uuid) {
        throw new Error("UUID is required to check the task status.");
      }

      console.log("Checking status for UUID:", result_data.url_uuid);
      for (let i = 0; i < 30; i++) {
        await new Promise(resolve => setTimeout(resolve, 18000)); // Wait 18 seconds

        const statusResponse = await axios.post('https://heybeauty.ai/api/get-task-info', { "task_uuid": result_data.url_uuid }, { headers });
        console.log("Status Response:", statusResponse.data);

        if (statusResponse.data && statusResponse.data.data) {
          const data = statusResponse.data.data;
          if (data.status === 'successed') {
            // execSync(`curl -o ${outTryonPath} ${data.tryon_img_url}`);
            const PoseDir = path.dirname(PoseFile.path)
            console.log("PoseeeDiirrrrr---",PoseDir,"\n")
      
             const baseDir = path.normalize(PoseDir+"/..");
             console.log("baseeSSSSSSSSSSSsDir-----", baseDir,"\n")
      
             const tryonFileDir = path.join(baseDir, 'tryonFile');
             console.log("tryonFileDir------->>", tryonFileDir,"\n")
      
             fs.mkdirSync(tryonFileDir, { recursive: true }); // Creates the folder if it doesn't exist
             const outTryonPath = path.join(process.cwd(), tryonFileDir);
             console.log('TryonFile Path:', outTryonPath);
      
            try {
              await ImageDownloader({
                imgs: [{
                  // uri: data.tryon_img_url,
                  uri:"https://i0.wp.com/picjumbo.com/wp-content/uploads/amazing-stone-path-in-forest-free-image.jpg?w=600&quality=80",
                  // filename: tryonFile.jpg,
                }],
                dest: tryonFileDir
              });
              console.log('File downloaded successfully.', ImageDownloader);
              res.status(200).json({ message: 'Task completed successfully and download tryon-image ' });
            } catch (error) {
              console.error('Error downloading file:', error.message);
              res.status(500).json({ error: 'Failed to download the try-on image.' });
            }
            console.log('Task completed successfully.');
          } else if (data.status === 'failed') {
            throw new Error('Task failed: ' + data.err_msg);
          }
        } else {
          console.log('Task is still processing...');
        }
      }
    } else {
      throw new Error('Invalid API response format');
    }
          // res.status(200).json(statu);  // Return the uuid in the response

    
  } 


    