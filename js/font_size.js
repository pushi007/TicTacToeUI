var min=14;
var max=18;

function increaseFontSize() {
   //debugger;
   var p = document.getElementsByClassName("fontSizeChange");
   //var p = document.getElementsByTagName('*');
   for(i=0;i<p.length;i++) {
 
      if(p[i].style.fontSize) {
         var s = parseInt(p[i].style.fontSize.replace("px",""));
      } else {
         var s = 16;
      }
      if(s!=max) {
 
         s += 2;
      }
      p[i].style.fontSize = s+"px"
 
   }
}


function defaultFontSize() {
 //debugger;
  var p = document.getElementsByClassName("fontSizeChange");
   for(i=0;i<p.length;i++) {
 
      if(p[i].style.fontSize) {
         var s = parseInt(p[i].style.fontSize.replace("px",""));
      } else {
 
         var s = 14;
      }
      if(s=min) {
 
         s += 2;
      }
      p[i].style.fontSize = s+"px"
 
   }
}


function decreaseFontSize() {
   //debugger;
  var p = document.getElementsByClassName("fontSizeChange");
   for(i=0;i<p.length;i++) {
 
      if(p[i].style.fontSize) {
         var s = parseInt(p[i].style.fontSize.replace("px",""));
      } else {
         var s = 16;
      }
      if(s!=min) {
         s -= 2;
      }
      p[i].style.fontSize = s+"px"
 
   }
}

function setFont() {
   var fontsize = GetCookie('fontSize');
        if(fontsize=='increase'){
          increaseFontSize();
        }else if(fontsize=='decrease'){
          decreaseFontSize();
        }else{
          defaultFontSize();
        }
}