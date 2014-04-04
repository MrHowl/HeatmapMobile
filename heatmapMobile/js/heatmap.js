$(document).ready(function() {
    
    var jQ = jQuery.noConflict(true);

    function $(id) {//获取元素的方法

        return document.getElementById(id);

    }

    var filesInput = $("filesInput"),//单选按钮

        filesInputMultiple = $("filesInputMultiple"),//多选按钮

        info = $("info"),//不支持Html5；上传失败；上传成功

        imageBox = $("imageBox"),//图片的信息

        btnUpload = $("btnUpload"),//上传按钮

        percent = $("percent"),//上传百分比

        wrapper = $("wrapper");//总的父元素

    //定义存放图片对象的数组,调用了$函数

    var uploadImgArr = [];

    //防止图片上传完成后，再点击上传按钮的时候重复上传图片

    var isUpload = false;

    if (window.File && window.FileList && window.FileReader && window.Blob) {//浏览器支持Html5
        
        filesInput.addEventListener("change", getFiles, false);//监听单选按钮

        filesInputMultiple.addEventListener("change", getFiles, false);//监听多选按钮
    } 

    else {//不支持html5的提示

        info.innerHTML = "您的浏览器不支持HTML5长传";

        info.className = "tips";

    }
    
    btnUpload.addEventListener("click", uploadFun, false);//监听上传按钮
    
    imageBox.addEventListener("click", deleteFiles, false);//监听删除按钮

    //定义获取图片信息的函数

    function deleteFiles(e) {
        
        e = e || window.event;

        tar = e.target;

        className = tar.className;

        if (className == "deleteFiles") {

            var index = jQ(tar).parent().index();   

            jQ(tar).parent().remove();

            uploadImgArr.splice(index,1);

            console.log(uploadImgArr);

        }

        return;

    }

    function getFiles(e) {//选择图片后做的处理

        isUpload = false;//图片标记为未上传

        e = e || window.event;//选择好的图片，是一个对象

        //获取file input中的图片信息列表

        var files = e.target.files;//对象中的一组数据：文件

        //console.log(files);

        for (var i = 0, f; f = files[i]; i++) {//files[i]存在即可循环，针对多选图片的写法

            //console.log(f);

            uploadImgArr.push(f);//将图片文件加至存储图片的数组，注意uploadImgArr是一个外部变量

            var reader = new FileReader();//为当前的文件建立一个FileReader,用来获取文件的信息

            //类似于原生JS实现tab一样（闭包的方法）

            reader.onload = (function(file) {//处理第i个被选择的文件

                //获取图片相关的信息

                var fileSize = (file.size / 1024).toFixed(1) + "K",//图片的大小，保留到小数点后一位

                    fileName = file.name;//图片的名字，保留五位

                //console.log(fileName)

                return function(e) {

                    var img = new Image();//预览图片

                    img.addEventListener("load", imgLoaded, false);//文件的监听

                    img.src = e.target.result;//第i个文件的地址

                    function imgLoaded() {

                        imageBox.innerHTML += "<li><img src='" + e.target.result + "' alt='" + fileName + "' title='" + fileName + "'> <span>" + fileName + "</span><br/><span>" + fileSize + "</span><br/><a href='javascript:void(0);' class='deleteFiles'>delete</a><p></p></li>";

                    }

                }

            })(f);

            //读取文件内容

            reader.readAsDataURL(f);

        }

    }


    //开始上传照片

    function uploadFun() {

        var j = 0;

        function fun() {

            if (uploadImgArr.length > 0 && !isUpload) {

                var singleImg = uploadImgArr[j];

                var xhr = new XMLHttpRequest();

                if (xhr.upload) {

                    //进度条

                    xhr.upload.addEventListener("Progress",

                        function(e) {

                            if (e.lengthComputable) {


                                percent.innerHTML = Math.round(e.loaded * 100 / e.total) + "%";

                                //计算网速

                            } else {

                                percent.innerHTML = "无法计算文件大小";

                            }

                        },

                        false);

                    // 文件上传成功或是失败

                    xhr.onreadystatechange = function(e) {

                        if (xhr.readyState == 4) {

                            if (xhr.status == 200 && eval("(" + xhr.responseText + ")").status == true) {

                                jQ("li").eq(j).children("p").text("file uploaded~");

                                percent.innerHTML = "100%";

                                isUpload = true;

                            } else {

                                info.innerHTML += singleImg.name + "上传失败; ";

                            }

                            //上传成功（或者失败）一张后，再次调用fun函数，模拟循环
                            

                            if (j < uploadImgArr.length - 1) {
                                
                                j++;

                                isUpload = false;

                                fun();

                            }

                        }

                    };

                    var formdata = new FormData();

                    formdata.append("FileData", singleImg);

                    // 开始上传

                    xhr.open("POST", "upload.php", true);

                    xhr.send(formdata);

                    var startDate = new Date().getTime();

                }

            }

        }
        fun();
    }
});

//定义获取对象的方法