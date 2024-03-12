//let's create our Type (Classes) for the model and the view
let BookModel = Backbone.Model.extend({
    defaults: {
        title: 'new book',
        author: 'no author yet'
    }
});

let BookView = Backbone.View.extend({   // CONSTRUCTOR FUNCTION - (The OBJECT that is created using)

    initialize: function(){
        this.listenTo(this.model,"change", this.render); //your view listentTo any change happening within the model
    },

    //responsible for displaying the model managed by the view on screen
    render: function(){
        let jsonModel = this.model.toJSON()     // we use "model" in here
        this.$el.html(                          // we use "el" in here
            "<h1>" + jsonModel.title + "</h1>" +
            "<span>"+ jsonModel.author +"</span>"
            
            );
    }
});

let book = new BookModel(); // create constructor for book

let view = new BookView({
    el : '#book-view', // el is a property
    model: book        // model is a property
});

view.render();

/* ---- MANUAL RENDERING ---- What if attributes change: we can change on the console like these: 

First - check the attributes on the console: book.attributes()
Second - set the new attributes on the console: book.set("author","Elijahu")
Third - call the render again: view.render();
And you can see change on the html page. Must to be written "Elijahu" instead of "no author yet".

*/

/* ------------ AUTOMATIC RENDERING ---------------- (rendering changing content using with Backbone - Events)

You can do that implementing another function in to the your CONSTRUCTOR FUNCTION; 
called>>>>>>>>>>>>>>>>>>>> 


initialize: function(){
    this.listenTo( this.model, "change", this.render ); //your view listentTo any change happening within the model
}


-- Need to provide a THIRD ARGUMENT  TO THIS FUNCTION that is what you want to do when this CHANGE HAPPENS, what kind of function you want to be called automatically when this change happens. At that point we need to call RENDER FUNCTION again. 
-- You need to provide always with THIS because the render function is inside of the OBJECT and THIS point to the OBJECT itself. 
The OBJECT that is created using this "let BookView = Backbone.View.extend({})" - new CONSTRUCTOR FUNCTION.

(Look at above the page in constructor function )
*/

book.set("title","Pink Dreams");
book.set("author","Elijah");

/* -------------------------------------- EXPLANATION OF CODES --------------------------------------------------

Once you create these two new types: 
let BookModel = Backbone.Model.extend({}); and let BookView = Backbone.View.extend({});

your code becomes very easy to maintain: 
(A)you have an object: let book = new BookModel(); that represents your model,
(B)you have and object: let view = new BookView({}); that represents your view,
(C)and you create: "el: '#book-view'" the your view passing the area of the page at your view manages, > <div id="book-view"></div>
(D)the object: "model: book" at your view is in charge displaying.

(E)and that's it, you call your render: view.render();
.
.
.
From that moment on if anything changes in your OBJECT the view automatically reflect to the change!

*/