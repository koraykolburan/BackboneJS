// Let's create our Type (Classes) for the MODEL and the VIEW 

// [FIRST] Let's creating Class for our MODEL
let BookModel = Backbone.Model.extend({
    defaults: {
        title: 'new book',
        author: 'no author yet'
    }
});

// [SECOND] Let's create Constructor Function for our VIEW
let BookView = Backbone.View.extend({   // CONSTRUCTOR FUNCTION - (The OBJECT that is created using)

// [SIXTH] Let's create EVENT FUNCTION -- to click button -- and create function to update
    events: { //This specify what type of events of UI events --- Look at the [SEVENTH]
        'click button[type=submit]':'evtUpdateBookData', //>>>this is just a string(click event + + selector[](css selector)) and after the ':' colon we use the function(after the render) that we created for the click event
    },

// [FIFTH] Let's create INITIALIZE FUNCTION -- to render changes of our model - listenTo(arg1,arg2,arg3) -- 
    initialize: function(){
        this.listenTo(this.model,"change", this.render); //your view listentTo any change happening within the model
    },

// [THIRD] Let's create RENDER FUNCTION -- toJSON() and html()
    render: function(){ //Render function is responsible for displaying the model managed by the view on screen(HTML)
        let jsonModel = this.model.toJSON()     // we use "model" in here
        this.$el.html(                          // we use "el" in here > HTML
            "<h1>" + jsonModel.title + "</h1>" +
            "<span>"+ jsonModel.author +"</span>" +
            "<hr>" +
            "<form>" +
            "<label name='title'>New Title:<input class='title-input' placeholder='new title' name='title'></label><br>" +
            "<label name='author'>New Author:<input class='author-input' placeholder='new author' name='author'></label><br>" +
            "<button type='submit'>Apply changes</button>" +
            "</form>"
            );
    },


// [SEVENTH] Let's create a FUNCTION to update our books model
//******* Finally, we have TWO BINDING SYSTEM *******
    evtUpdateBookData: function(evt){ //it will be wrapped inside of a jquery object
        evt.preventDefault(); //this tells the browser: just generate the click event and stop there.
        

        let $title = $('input.title-input', this.$el); // select the ".title-input" class and "this.$el" is only inside of our view
        let $author = $('input.author-input', this.$el); // same stuff for the author

        /*And then we can update our model.
        this.model.set('title', $title.val());  
        We can call the function val() to get out the value of the field 
        */

        this.model.set({ 
            'title': $title.val(),
            'author': $author.val()
        });
    }

});

// [FOURTH] Let's create Constructor Objects for NEW MODEL and NEW VIEW
let book = new BookModel();
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
// book.set("title","Pink Dreams");
// book.set("author","Elijah");

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


/* -------------------------------------- EXPLANATION OF CODES --------------------------------------------------

Once you create these two new types: 
let BookModel = Backbone.Model.extend({});
let BookView = Backbone.View.extend({});

Your code becomes very easy to maintain: 
(A)You have an object: let book = new BookModel(); that represents your model,
(B)You have an object: let view = new BookView({}); that represents your view,
(C)You create: "el: '#book-view'" the your view passing the area of the page at your view manages <div id="book-view"></div>
(D)The object: "model: book" at your view is in charge displaying.

(E)Finally, call your render: view.render();
.
.
.
From that moment on if anything changes in your OBJECT the view automatically reflect to the change!


---------------------- Notes ---------------------------
evt.PreventDefault(); We must to apply this especially when we work with submit button, because when we click the submit button, browser submit the data that comes from input field and it disappears. We must to use this prevent this default behaviour of browser.

*/