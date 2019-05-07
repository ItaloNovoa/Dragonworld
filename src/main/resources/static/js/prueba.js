var customWindow = window.open('', '_blank', '');
    

function cerrar() {
    var ventana=window.parent.self;
    ventana.opener=window.parent.self;
    ventana.close();
}