const fs = require('fs');
const path = require('path')

var mydict;
var categories;
var folder;


function load_gallery(folder, labels) {
  mydict = labels;
  var liid = 0;
  for (p in labels) {
    mypath = path.join(folder, p);
    mycat = labels[p];
    mydesc = " ";
    if (mycat > 0) {
      mydesc = "Etiquetado como... " + categories.categories[mycat-1];
    }
    Gallery.addItems( '<li id="li'+liid+'"><a href="#"><img src="'+mypath+'" height="65" width="65"  id="'+p+'" data-large="'+mypath+'" alt="'+mypath+'" data-description="'+mydesc+'" /></a></li>' );
    liid += 1;
  };
  Gallery.reinit();
}

var LabelIt = {

  load: function () {


    if (document.getElementById("load-directory").files.length === 0) {
      return
    }

    Gallery.clean();

    // Get selected directory
    folder = document.getElementById("load-directory").files[0].path

    // Init Gallery
    Gallery.init();

    // load categories.json and load category buttons
    var fileCategories;
    try {
      fileCategories = fs.readFileSync(path.join(folder, 'categories.json'), 'utf8');
    } catch (err) {
      // Here you get the error when the file was not found,
      // but you also get any other error
      $('#alert1').show();
      return
    }

    categories = JSON.parse(fileCategories);
    if (categories.categories.length > 9) {
      $('#alert2').show();
      return
    }
    Categories.init();
    num = 1
    categories.categories.forEach(l => {
      Categories.addCategory('<label class="btn btn-secondary">'+'<input type="radio" name="options" class= "category-btn" id="'+num+'" autocomplete="off">'+num+' | '+`${l[0].toUpperCase()}${l.slice(1)}`+'</label>');
      num++;
    });

    // load images and labels in the selected directory
    fs.readFile(path.join(folder, 'labels.json'), function read(err, data) {
      if (err) { // labels.json not present
        var dict = {};
        fs.readdir(folder, (err, files) => {
          files.forEach(file => {
            if(path.extname(file) === ".jpg" || path.extname(file) === ".png" || path.extname(file) === ".bmp") {
              //mypath = path.join(folder, file)
              mypath = file;
              dict[mypath] = 0;
            }
          });
          fs.writeFile(path.join(folder, 'labels.json'), JSON.stringify(dict), (err) => {
            if (err) throw err;
          });
          load_gallery(folder, dict);
        })
      }
      else {
        // labels.json present
        load_gallery(folder, JSON.parse(data, 'utf8'))
      }
    });
  }
};
