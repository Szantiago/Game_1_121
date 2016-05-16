# Game_1_121

En este juego el objetivo es probar la agilidad mental que tiene el usuario, en este caso a traves de encontrar números de manera ordenada.

# El Juego

Se le muestra al usuario una tabla con numeros distribuidos de manera aleatoria, el usuario debera encotrar los números en orden partiendo del 1, ademas el usuario contara con 3 ayudas, las cuales no son recuperables una vez sean usadas y su uso restara puntos al igual que seleccionar el número incorrecto de la calificacion final del juego.

![ScreenShot](https://raw.github.com/szantiago/Game_1_121/gh-pages/img/juego1.JPG)

![ScreenShot](https://raw.github.com/szantiago/Game_1_121/gh-pages/img/juego2.JPG)

![ScreenShot](https://raw.github.com/szantiago/Game_1_121/gh-pages/img/juego3.JPG)


#Link del juego 
[link](http://szantiago.github.io/Game_1_121/)
#Desarrollo (funciones principales)
El desarrollo se realizo con javascript, JQuery V1.11.3, css.
Se utilizo ion.sound para generar sonidos en los botones y figuras del juego, sweetalert2 para modificar la apariencia del alert

- Inicializacion de variables

```javascript
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
```

- Se crea la cuadricula que sera el escenario de los patrones
```javascript
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
```
- Funciones para los numeros aleatorios
```javascript
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
  ```
- Funcion para llenar el array que contiene los aciertos del usuarios 
```javascript
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
```

- Evento click de los cuadros
```javascript
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
```

###Autores
- Santiago Lozano
- Leidy Arevalo
