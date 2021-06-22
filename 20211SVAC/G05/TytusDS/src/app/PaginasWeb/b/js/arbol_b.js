class lista{
    constructor(){
        this.uno=null;
        this.fin=null;
        
    }

    guardar(valor){
        let nodo = new nodolista(valor)
        let aux1;
        let aux2;

        if(this.uno==null){
           this.uno=nodo;
            nodo.post=null;
            this.fin=nodo;
        }else{ aux1=this.uno;
            while(aux1!=null){
                aux2=aux1.post;
                if(nodo.dato<aux1.dato){
                    nodo.post=this.uno;
                    this.uno=nodo;
                    this.fin=this.uno;
                    break;}
                else{
                    if(nodo.dato>=aux1.dato && aux2==null){
                        aux1.post=nodo;
                        nodo.post=null;
                        this.fin=nodo;
                        break;
                    }else{  if(aux1.dato<=nodo.dato && aux2.dato>nodo.dato){
                        aux1.post=nodo;
                        nodo.post=aux2;
                        break;
                        }else{aux1=aux1.post;}
                        }}
                    
                    }
    }
    
    }

}



class Nodo{
    constructor(padre, id){
        
        this.hijos = []
        this.id = id
        this.padre = padre
        this.uno=null;
        this.claves = []
        this.fin=null;
    }
        
    
    agregar(valor){
        this.claves.push(valor)
        if(this.claves.length > 1){

            var matriz=this.claves;

            var aux = 0;
        for(var i=0; i< matriz.length-1; i++){
            for(var j=i+1; j<matriz.length; j++){

                if(matriz[i] > matriz[j]){
                    aux = matriz[i];
                    matriz[i] = matriz[j];
                    matriz[j] = aux;
                }
            }
        }
            this.claves =matriz;
        }
    }


}

var arrayNodes = []
var edges = []

var contador = 1



var arbol=null;


class nodolista{
    constructor(valor){
        this.dato=valor;
        this.post=null;
        this.ant=null
    }
}



class ArbolB{

    constructor(grado,medio){
        this.claves = []
        this.repetidos = false
        this.uno=null;
        this.fin=null;

        this.grado = grado;
        this.enmedio = medio;
        this.raiz = new Nodo(null, 0)
    }

    agregar(valor){
        console.log("l")
        this.raiz = this.valueagregar(valor,this.raiz)
    }

    valueagregar(valor,temp){
        
        if(temp.hijos.length == 0){
            temp.agregar(valor)
        }else{
            var encontrar = false
            for(var i = 0; i<temp.claves.length; i++){
                if(valor < temp.claves[i]){

                    encontrar = true
                    temp.hijos[i] = this.valueagregar(valor, temp.hijos[i])
                    break;
                }
            }
            if(!encontrar){
                temp.hijos[temp.claves.length] = this.valueagregar(valor, temp.hijos[temp.claves.length])
            }
        }
        if(temp.claves.length == this.grado){
            if(temp.padre == null){
                contador++
                var c = temp;
                temp = new Nodo(null, contador)
                temp.agregar(c.claves[this.enmedio])
                contador++
                temp.hijos.push(new Nodo(temp, contador))
                contador++
                temp.hijos.push(new Nodo(temp, contador))
                for(var i = 0; i<this.enmedio; i++){
                    temp.hijos[0].agregar(c.claves[i])
                    temp.hijos[1].agregar(c.claves[i+this.enmedio+1])
                }
                if(c.hijos.length > 0){
                    for(var i = 0; i<this.enmedio+1; i++){
                        temp.hijos[0].hijos[i] = c.hijos[i]
                        temp.hijos[0].hijos[i].padre = temp.hijos[0]
                        temp.hijos[1].hijos[i] = c.hijos[i+this.enmedio+1]
                        temp.hijos[1].hijos[i].padre = temp.hijos[1]
                    }
                }
            }else{
                var claveMedia = temp.claves[this.enmedio]
                temp.padre.agregar(claveMedia)
                var index

                var tieneHijos = false
                if(temp.hijos.length > 0){
                    tieneHijos = true
                }


                for(index = 0; index < temp.padre.claves.length; index++){
                    if(temp.padre.claves[index] == claveMedia){
                        break
                    }
                }

                for(var i = temp.padre.claves.length; i>index+1; i--){
                    temp.padre.hijos[i] = temp.padre.hijos[i-1]
                }

                var aux = temp
                contador++
                temp.padre.hijos[index] = new Nodo(temp.padre, contador)
                //console.log("Claves  "+temp.padre.hijos[index].claves)

                contador ++
                temp.padre.hijos[index+1] = new Nodo(temp.padre, contador)
                for(var i = 0; i<this.enmedio; i++){
                    console.log(aux.claves[i])
                    temp.padre.hijos[index].agregar(aux.claves[i])
                    temp.padre.hijos[index+1].agregar(aux.claves[i+this.enmedio+1])
                }
                temp = temp.padre.hijos[index]

                if(tieneHijos){
                    for(var i = 0; i<this.enmedio+1; i++){
                        temp.padre.hijos[index].hijos[i] = aux.hijos[i]
                        temp.padre.hijos[index].hijos[i].padre = temp.padre.hijos[index]
                    }
                    for(var i = this.enmedio+1; i<this.grado+1; i++){
                        temp.padre.hijos[index+1].hijos[i-this.enmedio-1] = aux.hijos[i]
                        temp.padre.hijos[index+1].hijos[i-this.enmedio-1].padre = temp.padre.hijos[index+1]
                    }
                    
                }
            }
        }
        return temp
    }

    guardar(valor){
        let nodo = new nodolista(valor)
        let aux1;
        let aux2;

        if(this.uno==null){
           this.uno=nodo;
            nodo.post=null;
            this.fin=nodo;
        }else{ aux1=this.uno;
            while(aux1!=null){
                aux2=aux1.post;
                if(nodo.dato<aux1.dato){
                    nodo.post=this.uno;
                    this.uno=nodo;
                    this.fin=this.uno;
                    break;}
                else{
                    if(nodo.dato>=aux1.dato && aux2==null){
                        aux1.post=nodo;
                        nodo.post=null;
                        this.fin=nodo;
                        break;
                    }else{  if(aux1.dato<=nodo.dato && aux2.dato>nodo.dato){
                        aux1.post=nodo;
                        nodo.post=aux2;
                        break;
                        }else{aux1=aux1.post;}
                        }}
                    
                    }
    }
    
    }
    
    insertarNodo(valor,grado){
        this.guardar(valor)
        var medio;
        if(arbol == null){
            if (grado%2==0) {medio = grado/2}
            else{
                medio = (grado-1)/2
            }
            arbol = new ArbolB(grado,medio)
        }
        arbol.agregar(valor)
    }

    as(){
        arrayNodes = []
        edges = []  
        let ldata=[];
        let temp=arbol.raiz;
        if(temp != null){
            var texto = ""
            var i
            for(i = 0; i<temp.claves.length; i++){
                if(i == temp.claves.length-1){
                    texto = texto + temp.claves[i].toString();
                }else{
                    texto = texto + temp.claves[i].toString() + "|"
                }
                console.log(texto);
            }
            arrayNodes.push({id: temp.id, label: texto})
            texto = ""
            for(i = 0; i<temp.hijos.length; i++){
                edges.push({from: temp.id, to: temp.hijos[i].id})
                this.a(temp.hijos[i])
            }
        }
        ldata.push(arrayNodes);
        ldata.push(edges);
        return ldata;
        
    }

    a(temp){
        if(temp != null){
            var texto = ""
            var i
            for(i = 0; i<temp.claves.length; i++){
                if(i == temp.claves.length-1){
                    texto = texto + temp.claves[i].toString();
                }else{
                    texto = texto + temp.claves[i].toString() + "|"
                }
                console.log(texto);
            }
            arrayNodes.push({id: temp.id, label: texto})
            texto = ""
            for(i = 0; i<temp.hijos.length; i++){
                edges.push({from: temp.id, to: temp.hijos[i].id})
                this.a(temp.hijos[i])
            }
        }
    }

    leer(){
        let ldatos=[];
        let aux = this.uno;
        if (this.uno!=null){
            do{
                ldatos.push(aux.dato.toString());
                aux=aux.post;
                }while(aux!=null);}
        return ldatos;
      }
  

 

}







module.exports = ArbolB;

