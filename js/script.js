$(function()
{
  var tabla = "", //Contiene la tabla y sus elementos
  id=0, //id de los cuadros de la tabla
  dimension=11, //dimensionde la tabla
  cantCir=dimension*dimension, //Determina la cantidad maxima para los numeros aleatorios
  tamano=35, //tamaño de los cuadros de la tabla
  num=0, //numero aleatorio
  li=[], //Para dividir el id de los elementos de la tabla cuando sean clickeados
  aleatorios=[], //Array de numeros aleatorios
  numer=[], //Array de numeros en orden
  aciertos=[], //Array de aciertos del usuairo
  animacion="flash", //animacion inicial
  ayuda=0, //Numero de ayudas usadas
  puntuacion=0, //puntuacion al finalizar el juego
  // Variables para el cronometro
  inter,
  seg=0,
  min=0,
  hrs=0,
  tim1,
  tim2,
  tim3;

  $("#titulo").text("Game 1-"+cantCir) //Titulo mostrado en la pagina
  $("#ayuda").hide(); //Boton de ayuda oculto al abrir la pagina
  $("#fin").hide(); //Boton de finalizar el juego oculto al abrir la pagina

  //Inhabilitar Ctrl+b, Ctrl+f y Ctrl+g para busquedas
  window.addEventListener("keydown",function (e) {
    //From: http://stackoverflow.com/questions/7091538/is-it-possible-to-disable-ctrl-f-of-find-in-page
    if ((e.ctrlKey && e.keyCode === 66) ||  (e.ctrlKey && e.keyCode === 70) || (e.ctrlKey && e.keyCode === 71)) {
        e.preventDefault();
    }
  });

//Funcion para generar numero aleatorio
  function aleatorio()
  {
    num = Math.floor(Math.random()*(cantCir-1+1)+1);
  }

//Funcion para determinar si un numero generado en aleatorio esta repetido
  function repetido()
  {
    var repe = false;
    for (var i=0; i<aleatorios.length; i++)
    {
      if (num === aleatorios[i])
      {
        repe = true;
      }
    }
    return repe;
  }

//Funcion para llenar el array con numeros aleatorios no repetidos
  var numAleatorios = (function numAleatorios(cantCir)
  {
    for(var j=0; j<cantCir; j++)
    {
      aleatorio();
      if(!repetido())
      {
        aleatorios.push(num);
      }else
      {
        j--;
        aleatorio();
      }
    }
    return numAleatorios;
  })(cantCir);

//Funcion para la creacion de la tabla o escenario para el juego
  var escenario = (function escenario(dimension)
  {
    tabla = "<table id = 'cuadros'>";
    for(var columna=0; columna < dimension; columna++)
    {
      tabla+="<tr>";
      for(var fila=0; fila < dimension; fila++)
      {
        id++;
        numer.push(id); //Llena el array de numeros en orden
        tabla += "<td>";
        tabla += "<div id='tabla_"+(id)+"' style='color:"+randomColor()+";'class= 'cuadrado animated "+animacion+"'>"+aleatorios[id-1]+"</div>";
        tabla += "</td>";
      }
      tabla += "<tr>";
    }
    tabla += "</table>";
    $("#tabla").append(tabla);
    $(".cuadrado").css({"width": tamano,	"height": tamano, "user-select": "none"});
    return escenario;
  })(dimension);

//Funcion para el tiempo de juego
  function interval()
  {
    inter=setInterval(function(){
      seg++;
      tim1=seg<10?"0"+seg:seg;
      tim2=min<10?"0"+min:min;
      tim3=hrs<10?"0"+hrs:hrs;
      if (seg===59)
      {
        seg=0
        min++;
      }
      if (min===59)
      {
        min=0;
        hrs++;
      }
      $("#crono").text("Tiempo: "+tim3+":"+tim2+":"+tim1);
    },1000);
  }

//Funcion para determinar si el valor a ingresar en el array de aciertos ya se encuentra
  function aciertoRepetido(n) {
   var aciertorepe = false;
   for (var i=0; i<aciertos.length-1; i++)
   {
     if (n === aciertos[i])
     {
       aciertorepe = true;
     }
    }
    return aciertorepe;
  }

//Funcion para cambiar el borde de los cuadros de la tabla cuando sean clickeados
  function cambioBorde(idT) {
    $("#tabla_"+idT).css({"border-radius": "100px", "border-color":"red"}).unbind();
    $("#obj").text("Objetivo: "+(aciertos.length+1));
  }
//Funcion para mostrar un sweetalert cuando termina el juego, con su puntuacion, Ultimo numero encontrado y el tiempo que ha tardado
  function finJuego()
  {
    ion.sound.play("Message-alert-tone");
    $("#obj").text("Ultimo # encontrado: "+(aciertos.length));
    clearInterval(inter);
    swal({
      title: "Game Over",
      html: '<p><font color="gray"><h4>Su puntuación: '+puntuacion+'</h4></font></p>'
      +'<p> Ultimo numero encontrado:'+ aciertos.length+'</p>'
      +'<p> Tiempo Final:'+tim3+':'+tim2+':'+tim1+'</p>',
      background: '#fff url(//www.free-patterns.info/wp-content/uploads/2013/03/gray-spray-wall-ver-3.jpg)',
      confirmButtonText:"Vale",
      confirmButtonColor:"#558450",
      showLoaderOnConfirm:"true",
    }).then(function(){
          location.reload();
      })
  }

// Funcion para iniciar la partida
    function iniciaPartida()
    {
      $("#obj").text("Objetivo: "+(aciertos.length+1)); //Muestra el numero a buscar
      interval(); //inicia el cronometro
      $("#inicio").hide(); //Esconde el boton inicio
      $("#ayuda").show(); //Hace visible el boton ayuda
      $("#fin").show(); //Hace visible el boton finalizar partida
      $(".cuadrado").click(function cuadrado(e) //Evento click de los cuadros de la tabla
      {
        li = e.target.id;
        li=li.split("_");
        var x = Number(li[1]-1);
        var c = aleatorios[x];
        if(c==numer[aciertos.length])
        {
          aciertos.push(c);
          if(!aciertoRepetido(c))
          {
            ion.sound.play("Mouse-click-sound");
            puntuacion+=10;
            cambioBorde(li[1]);
          }
        }else
        {
          puntuacion-=5;
          ion.sound.play("Error-sound-effect");
        }
        if(aciertos.length===cantCir)
        {
          finJuego();
        }
      });
      $("#ayuda").click(function cuadrado(e) //evento click del boton de ayuda
      {
        ion.sound.play("Finger-snap");
        puntuacion-=10;
        ayuda++;
        if (ayuda>2)
        {
          $("#ayuda").unbind();
          $("#ayuda").hide();
        }
        for (var i = 0; i < aleatorios.length; i++)
        {
          console.log(1+numer.indexOf(aleatorios[i]));
          if(numer[aciertos.length]===(1+numer.indexOf(aleatorios[i])))
          {
            aciertos.push(aleatorios[i]);
            cambioBorde((1+i));
            break;
          }
        }
      });
      $("#fin").click(function cuadrado(e) //evento click del boto finalizar partida
      {
        finJuego();
      });
    }

//evento click del boton de inicio de la partida
    $("#inicio").click(function()
    {
      console.log("inicio partida");
      iniciaPartida();
    });

//Funcion para los colores aleatorios
    function randomColor()
    {
      // from http://www.paulirish.com/2009/random-hex-color-code-snippets/
      return'#'+(function lol(m,s,c){return s[m.floor(m.random() * s.length)] +
      (c && lol(m,s,c-1));})(Math,'0123456789ABCD',4);
    };

//Configuracion para los sonidos agregados a los botones y cuadros del juego
    ion.sound({
      // from: http://ionden.com/a/plugins/ion.sound/demo.html
      //Sounds from: http://www.orangefreesounds.com/
      sounds: [
          {name: "Mouse-click-sound"},
          {name: "Message-alert-tone"},
          {name: "Error-sound-effect"},
          {name: "Finger-snap"}
      ],
      // main config
      path: "sounds/",
      preload: true,
      multiplay: true,
      volume: 0.5
    });
});
