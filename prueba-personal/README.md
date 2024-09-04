# Pasos y guia

Documentación extraida de: https://pabpereza.dev/docs/Cursos/docker

## Conceptos basicos

* Contenedor: Es una instancia de una imagen. Es un proceso que se ejecuta en un entorno aislado.

* Imagen: Es un archivo binario que contiene todos los elementos necesarios para ejecutar un contenedor. Es como una plantilla que se utiliza para crear contenedores.

* Dockerfile: Es un archivo de texto que contiene las instrucciones necesarias para crear una imagen.

* Docker Hub: Es un repositorio de imágenes de contenedor. Es como un GitHub pero de imágenes de contenedor.

### Contenedor:

Un contenedor es una instancia de una imagen. Un contenedor es un proceso que se ejecuta en un entorno aislado, ojo, un proceso. Esto es importante, porque un contenedor no es una máquina virtual, no es un sistema operativo, es un proceso que contiene una aplicación y sus dependencias, tanto de librerías del lenguaje de programación que estés usando, como de sistema operativo. Por este último punto, es por lo que se suelen confundir con máquina virtuales.

Los contenedores, se ejecutan con un propósito o un comando principal, cuando este comando finaliza, el contenedor también finaliza. Esto es importante, porque un contenedor puede ejecutar una tarea y finalizar, o puede ejecutar un servicio que se mantenga siempre en ejecución.

Este comando principal, se define en el Dockerfile antes de construir la imagen, en la instrucción CMD o ENTRYPOINT. Veremos las diferencias más adelante.

Podemos ejecutar un contenedor, pararlo, reiniciarlo, eliminarlo, etc. Aunque un contenedor se elimine, no se elimina la imagen, recordemos que este solo es una instancia de la imagen. Por lo que podemos ejecutar un contenedor con la misma imagen las veces que queramos.

Por último, una imagen no solo es una definición de una aplicación, sino que también puede contener datos o incluso el estado de una aplicación. Es decir, podríamos ejecutar un contenedor, almacenar datos, cargar archivos en memoria RAM y salvar el estado del contenedor. Como si fuera una snapshot de una máquina virtual. Este proceso de guardar el estado o "commit" nos permite generar una imagen nueva con el estado actual del contenedor.

### Imagen:

Una imagen es un archivo que contiene todos los elementos necesarios para ejecutar un contenedor. Es como una plantilla que se utiliza para crear contenedores. Una imagen contiene los siguientes elementos:

* Aplicación: La aplicación que queremos ejecutar. Puede ser programada por nosotros o una aplicación de terceros ya empaquetada.

* Librerías de lenguaje: Las librerías de terceros del lenguaje de programación que utilicemos. Si fuera python, por ejemplo, las librerías de numpy, pandas, etc.

* Librerías de Sistema Operativo: Aunque no es un sistema operativo completo, si que contiene las librerías y dependencias necesarias para ejecutar una aplicación. Por ejemplo, librerías muy comunes como curl, wget, cat... funcionalidades en las que se basan muchas aplicaciones.

* Configuración: La configuración de arranque de la aplicación. Que usuario ejecuta la aplicación, comandos de arranque, puertos que expone, etc.

Supongamos que tenemos una aplicación escrita en Java, necesitaremos una imagen que tenga instalado como dependencias el JDK o JRE necesarios para ejecutar Java, nuestra aplicación compilada junto a las librerías de terceros (por ejemplo, el framework springboot) y, por último, la definición de como se debe ejecutar la aplicación (por ejemplo, se tiene que ejecutar con el comando java application.jar).

Normalmente, las imágenes se crean a partir de un Dockerfile, que un archivo que nos permite definir el proceso de construcción de una imagen.

Como ya hemos mencionado, se podría guardar el estado de un contenedor en ejecución en una imagen, peroo no suele ser l más común. La buena práctica es que las imágenes sean estáticas y no dependan del estado de un contenedor. Permitiendo así, que desde el primer arranque se comporte de la misma forma en cualquier entorno.

### Dockerfile

Estos archivos, son un conjunto de instrucciones secuenciales que le especifican a Docker cómo construir una imagen. Permite usar múltiples instrucciones para instalar dependencias, copiar archivos, definir variables de entorno, etc.

Suelen comenzar por una instrucción FROM, que define la imagen base que se va a utilizar. A partir de ahí, se pueden definir múltiples instrucciones para modificar la imagen base y adaptarla a nuestras necesidades.

Por ejemplo, si queremos crear una imagen con un servidor web Apache, podríamos crear un Dockerfile con el siguiente dockerfile:

FROM ubuntu:22.04
RUN apt-get update && apt-get install -y apache2
COPY index.html /var/www/html/
CMD ["apache2ctl", "-D", "FOREGROUND"]

En ejemplo anterior, partimos de una imagen base de Ubuntu 22.04, actualizamos los paquetes e instalamos Apache2. Copiamos un archivo index.html de nuestra web estática en la carpeta de Apache y ejecutamos el comando apache2ctl -D FOREGROUND para arrancar el servidor.

Básicamente, es como si estuviéramos un Linux en el que lanzamos una serie de comandos y configuraciones para posteriormente, pero todos los pasos que hacemos los definimos como código para que el proceso sea fácilmente replicable.

### Docker Hub

Es un repositorio de imágenes de contenedor. En Docker Hub, podemos encontrar imágenes de contenedores ya creadas por la comunidad, que podemos utilizar para nuestros proyectos. También podemos subir nuestras propias imágenes y compartirlas con la comunidad.

Este repositorio es propiedad de Docker, pero no es el único. Dentro del estándar OCI, existen otros repositorios como GitHub Container Registry, GitLab Container Registry, Amazon Elastic Container Registry, Google Container Registry, etc. Es decir, podemos almacenar nuestras imágenes en cualquier repositorio que soporte el estándar de Docker, aunque Docker Hub es de los más populares.

Docker nos permite subir y descargar imágenes de estos repositorios de forma sencilla, con el comando docker push y docker pull, versionar las imágenes, etiquetarlas, etc. Muy similar a como lo haríamos con un repositorio de código fuente de tipo git pero con imágenes de contenedor.