package com.zhure.animals.controller;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSON;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import com.zhure.animals.common.Result;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.List;

@RestController
@RequestMapping("files")
public class FileController {

    @Value("${server.port}")
    private String port;
    private static final String ip = "http://120.79.190.143";

    @CrossOrigin
    @PostMapping("/editor/upload")
    public JSON editorUpload(MultipartFile file) throws IOException {
        // 获取源文件名称
        String originalFilename = file.getOriginalFilename();
        // 定义文件唯一标识符（前缀）
        String flag = IdUtil.fastSimpleUUID();
        // 获取上传路径
        String rootFilePath = System.getProperty("user.dir") +
                "/springboot/src/main/resources/files/" + flag + "_" + originalFilename;
        // 把文件写入到上传的路径
        FileUtil.writeBytes(file.getBytes(), rootFilePath);
        //返回结果 url
        String url = ip + ":" + port + "/files/" + flag;
        JSONObject json = new JSONObject();
        json.set("errno", 0);
        JSONArray arr = new JSONArray();
        JSONObject data = new JSONObject();
        arr.add(data);
        data.set("url", url);
        json.set("data", arr);
        return json;
    }

    @CrossOrigin
    @PostMapping("/upload")
    public Result<?> upload(MultipartFile file) throws IOException {
        // 获取源文件名称
        String originalFilename = file.getOriginalFilename();
        // 定义文件唯一标识符（前缀）
        String flag = IdUtil.fastSimpleUUID();
        // 获取上传路径
        String rootFilePath = System.getProperty("user.dir") +
                "/springboot/src/main/resources/files/" + flag + "_" + originalFilename;
        // 把文件写入到上传的路径
        FileUtil.writeBytes(file.getBytes(), rootFilePath);
        //返回结果 url
        return Result.success(ip + ":" + port + "/files/" + flag);
    }

    @GetMapping("/{flag}")
    public void getFiles(@PathVariable String flag, HttpServletResponse response) {
        // 新建一个输出流对象
        OutputStream os;
        // 文件上传根路径
        String basePath = System.getProperty("user.dir") + "/springboot/src/main/resources/files/";
        // 获取所以文件名称
        List<String> fileNames = FileUtil.listFileNames(basePath);
        String fileName = fileNames.stream().filter(name -> name.contains(flag)).findAny().orElse("");
        try {
            if (StrUtil.isNotEmpty(fileName)) {
                response.addHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(fileName, "UTF-8"));
                response.setContentType("application/octet-stream");
                // 通过文件的路径读取文件字节流
                byte[] bytes = FileUtil.readBytes(basePath + fileName);
                // 通过输出流返回文件
                os = response.getOutputStream();
                os.write(bytes);
                os.flush();
                os.close();
            }
        } catch (Exception e) {
            System.out.println("文件下载失败");
        }
    }
}
