const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');

// exports.createJob= async (poseFile, clothFile) => {
//         const params = {
//           user_img_name: poseFile.filename,
//           cloth_img_name: clothFile.filename,
//           category: '1',
//           caption: 'red, t-shirt'
//       };  
//         const response = await axios.post('https://heybeauty.ai/api/create-task', params, { headers });
//         return response.data.data.uuid;
//       };

    // exports.checkStatus = async (uuid, res) => {
    //     let status = 'processing';
    //     for (let i = 0; i < 30 && status !== 'successed'; i++) {
    //       await new Promise(resolve => setTimeout(resolve, 18000));
    //       const taskStatus = await axios.post('https://heybeauty.ai/api/get-task-info', { task_uuid: uuid }, { headers });
    //       status = taskStatus.data.data.status;
      
    //       if (status === 'successed') {
    //         const { user_img_url, tryon_img_url, mask_img_url } = taskStatus.data.data;
    //         res.send({ message: 'Task completed!', user_img_url, tryon_img_url, mask_img_url });
    //         return;
    //       } else if (status === 'failed') {
    //         res.status(500).send('Task failed');
    //         return;
    //       }
    //     }
    //     res.status(202).send('Task is still processing. Try again later.');
    //   };
      