$(document).ready(function(){var Api={v:'',h:'',t:''};var Conversion=false;var Complete=false;var Mode='';var p=false;var Progress='';var s={1:'gpkio',2:'hpbnj',3:'macsn',4:'pikku',5:'fgkzc',6:'hmqbu',7:'kyhxj',8:'nwwxj',9:'sbist',10:'ditrj',11:'qypbr',12:'wiyqr',13:'xxvcy',14:'afyzk',15:'kjzmv',16:'txrys',17:'kzrzi',18:'rmira',19:'umbbo',20:'aigkk',21:'qgxhg',22:'twrri',23:'fkaph'};var Set={title:false};var Title='';var E={form:{video:'Please enter a valid YouTube video',format:'Please select a valid format'},list:{params:'A wrong parameter was delivered.',conversions:'You already have 10 active conversions. Please wait a few minutes to start a new conversion.',video_not_found:'The video was not found. Please check your entry.',database:'A database error occurred.',video_extraction:'The videoinformation could not be extracted.',video_download:'The video could not be downloaded.',youtube_blocked:'Currently there are no YouTube downloads possible. Please try in a few minutes again.',video_age:'The video couldn\'t be downloaded because it\'s not released for people below the age of 18.',video_duration:'We are sorry, the selected video is too long. It may only be 120 minutes long.',download_expired:'The link is no longer valid and has expired. The download will be restarted.',session:'Your session has expired please refresh the page.',video_not_found_2:'The chosen video is no longer available on YouTube.'}};var Ea={check:new Array(),convert:new Array()};Ea.check[0]=E.list.params;Ea.check[1]=E.list.conversions;Ea.check[2]=E.list.video_not_found;Ea.check[3]=E.list.video_download;Ea.check[7]=E.list.download_expired;Ea.check[100]=E.list.database;Ea.check[200]=E.list.session;Ea.convert[0]=E.list.params;Ea.convert[1]=E.list.video_download;Ea.convert[3]=E.list.video_download;Ea.convert[5]=E.list.youtube_blocked;Ea.convert[7]=E.list.video_download;Ea.convert[8]=E.list.video_not_found_2
Ea.convert[9]=E.list.video_age;Ea.convert[11]=E.list.video_duration;Ea.convert[100]=E.list.database;Ea.convert[102]=E.list.database;Ea.convert[200]=E.list.session;$('#formats a').click(function(){if(!Conversion){switch($(this).attr('id')){default:case'mp3':$('#format').val('mp3');$('#mp4').css('background-color','#0087cf');$('#mp3').css('background-color','#007cbe');break;case'mp4':$('#format').val('mp4');$('#mp3').css('background-color','#0087cf');$('#mp4').css('background-color','#007cbe');break;}}return false;});function ErrorBox(Error,Type){clearInterval(Progress);if(Type=='expired'){$('#converter').before('<div id="error">'+Error+'</div>');}else{var Api=(-1<document.URL.indexOf('api'))?'api.php':'';$('#converter').before('<div id="error">'+Error+' As an alternative you can try to search the song on <a href="http://www.mp3juices.cc/" rel="nofollow" target="_blank">mp3juices.cc</a> and download it from there. <div id="retry"><a href="'+Api+'" rel="nofollow">Please try to convert another YouTube video by clicking here</a></div></div>');}}$(document).on('click','#download',function(){if(p&&Mode=='p'){p=false;window.open('http://ads.mp3checker.com/1.php');}else if(p&&Mode=='a'){p=false;window.open('http://ads.mp3checker.com/1.php');}return true;});function DownloadVideo(Sid,Hash){clearInterval(Progress);$('#progress').hide();if(Mode=='a'){p=true;}else if(Mode=='p'){$.ajax({url:'p.php',async:false,cache:false,data:{c:1},type:'POST',success:function(Data){if(Data){p=true;}}});}var Download='http://'+s[Sid]+'.yt-downloader.org/download.php?id='+Hash;($('#ad').length)?$('#download').attr('href',$('#ad').val()+Download):$('#download').attr('href',Download);if(Dropbox.isBrowserSupported()){var DropboxTitle=$('#title').html();if(-1<DropboxTitle.indexOf('Error')){DropboxTitle='noname';}$('#dropbox').append(Dropbox.createSaveButton(Download,$('#title').html()+'.mp3','')).show();}$('#buttons').show();}function SetTitle(Data){clearInterval(Title);(Data=='noname')?$('#title').html('Error: the video title wasn\'t found :('):$('#title').html(Data);}function ConvertVideo(Video,Hash){var Steps=new Array('checking','loading','converting');$.ajax({url:'https://d.yt-downloader.org/progress.php',dataType:'jsonp',data:{id:Hash},success:function(Values){var Data={};$.each(Values,function(Name,Value){Data[Name]=(Name=='title')?Value:parseInt(Value);});if(0<Data.error){if(0<Data.title.length){SetTitle(Data.title);}else{clearInterval(Title);}Complete=true;$.ajax({url:'error.php',async:false,cache:false,type:'POST',data:{f:2,e:Data.error,s:Data.sid,v:Video,h:Hash},success:function(Os){ErrorBox(Ea.convert[Data.error]);}});return false;}switch(Data.progress){case 0:case 1:case 2:if(!Set.title&&0<Data.title.length){SetTitle(Data.title);Set.title=true;}$('#progress_text').html(Steps[Data.progress]+' video');break;case 3:Complete=true;DownloadVideo(Data.sid,Hash);break;}if(!Complete){window.setTimeout(function(){ConvertVideo(Video,Hash);},3000);}}});}function CheckVideo(Video,Format){if(Api.h.length){clearInterval(Title);$('#title').html(Api.t);ConvertVideo(Api.v,Api.h);}else{$.ajax({url:'https://d.yt-downloader.org/check.php',dataType:'jsonp',data:{v:Video,f:Format},success:function(Values){var Data={};$.each(Values,function(Name,Value){Data[Name]=(Name=='title'||Name=='hash')?Value:parseInt(Value);});if(0<Data.error){$.ajax({url:'error.php',async:false,cache:false,type:'POST',data:{f:1,e:Data.error,s:'',v:Video,h:''},success:function(){ErrorBox(Ea.check[Data.error]);}});return false;}if(0<Data.ce&&0<Data.sid){SetTitle(Data.title);DownloadVideo(Data.sid,Data.hash);}else{ConvertVideo(Video,Data.hash);}}});}}function GetVideoId(Link){if(-1<Link.indexOf('%')){var Limit=0;do{Link=decodeURIComponent(Link);Limit++;}while(-1<Link.indexOf('%')&&Limit<3);}if(new RegExp('youtube\.com').test(Link)&&(Video=new RegExp(/v\=[a-zA-Z0-9\-\_]{11}/).exec(Link).toString())){return Video.substr(2);}else if(new RegExp('youtu\.be').test(Link)&&(Video=new RegExp(/\/[a-zA-Z0-9\-\_]{11}/).exec(Link).toString())){return Video.substr(1);}else{return false;}}$('#form').submit(function(){if(-1<document.URL.toLowerCase().indexOf('api')){location.href='/api.php#conversion';Mode='a';}else{location.href='#conversion';Mode='p';}if(0<Api.v.length){var Video=Api.v;var Format='mp3';}else{var Video=$.trim($('#video').val());var Format=$.trim($('#format').val().toLowerCase());Video=GetVideoId(Video);}if(!Video){$('#video').val(E.form.video);return false;}if(Format!='mp3'&&Format!='mp4'){$('#video').val(E.form.format);return false;}if(Video.length!=11&&Format.length!=3){$('#video').val(E.list.params);return false;}Conversion=true;$('#title_text').html('Getting video title');Title=setInterval(function(){if($('#title_animation').html().length<3){$('#title_animation').append('.');}else{$('#title_animation').html('.');}},600);$('#input_background').hide();$('#progress').show();Progress=setInterval(function(){if($('#progress_animation').html().length<3){$('#progress_animation').append('.');}else{$('#progress_animation').html('.');}},600);CheckVideo(Video,Format);return false;});if(0<document.URL.indexOf('#')){var Params=document.URL.split('#')[1].split('|');$.each(Params,function(Index,Value){Params[Index]=$.trim(Value);});if(Params[0]=='h'&&Params[1].length==11&&Params[2].length==32){Api.v=Params[1];Api.h=Params[2];Api.t=decodeURIComponent(Params[3]);$('#form').submit();}else{if(Params[0].length==11&&Params[1].length==3){$('#video').val('https://www.youtube.com/watch?v='+Params[0]);if(Params[1]=='mp4'){$('#format').val('mp4');$('#mp3').css('background-color','#0087cf');$('#mp4').css('background-color','#007cbe');}if(Params.length==3){if(0<Params[2].length){$('#video').after('<input id="ad" type="hidden" name="ad" value="'+decodeURIComponent(Params[2])+'" />');}}$('#form').submit();}}}var Url=document.URL.split('/');if(Url.length==5&&Url[3]=='expired'){ErrorBox('The link is no longer valid and has expired.','expired');}});
