# CONTENEDORES DE APLICACIÓN WEB CON SERVIDOR, BASE DE DATOS Y FRONT

## 1. ENTRAR AL DIRECTORIO docker: cd .\docker\
## 2. EJECUTAR EL COMANDO: docker build -t postgres-db2 .
## 3. SALIRSE DEL DIRECTORIO: cd ..
## 4. ENTRAR AL DIRECTORIO api: cd .\api\
## 4. EJECUTAR EL COMANDO: docker build -t nodeserver .
## 5. EJECUTAR EL COMANDO: docker compose up
## 6. ABRIR OTRA TERMINAL Y EJECUTAR EL COMANDO: docker exec -it api-db-1 bash
## 7. DENTRO DE LA NUEVA SESION, EJECUTAR EL COMANDO: psql -U postgres world < /home/proyectos/dump2.sql
## 8. EJECUTAR EL COMANDO: \q
## 9. EJECUTAR EL COMANDO: exit
## 10. SALIRSE DEL DIRECTORIO: cd ..
## 11. ENTRAR AL DIRECTORIO api: cd .\front\
## 12. EJECUTAR EL COMANDO: docker build -t nodefront .
## 13. EJECUTAR EL COMANDO: docker compose up
## 14. DIRIGIRSE A TU NAVEGADOR Y ESCRIBIR LA URL: localhost:3000
## 15. EN LA BARRA DE BUSCAR, COLOCAR EL SIGUIENTE ID: 14160001
## 16. DISFRUTAR


