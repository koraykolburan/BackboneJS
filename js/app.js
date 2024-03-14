// ------------------------------------------- Single Page Web Application -----------------------------------------

// [FIRST] -- Let's create diffrent types of views 
// and each one of these is a CONSTRUCTOR FUNCTION that will be used to create the objects represents those views.

let HomeView = Backbone.View.extend({
    render: function(){
        this.$el.html(
            '<h1>Home Page</h1>' + 
            '<a href="#first">Go to First View</a>'
        );
    }
}); 

let FirstView = Backbone.View.extend({
    render: function(){
        this.$el.html(
            '<h1>First View</h1>' +
            '<a href="#">Go back to the Home Page</a>'
        );
    }
});

// NoRouteView: that we will be using to display a message to the user when an invalid route is a selected
let NoRouteView = Backbone.View.extend({
    render: function(){
        this.$el.html(
            '<h1>Opps, looks like you typed the wrong URL...</h1>' +
            '<a href="#">Go back to the Home Page</a>'
        );
    }
}) 

let view;

let AppRouter = Backbone.Router.extend({
    routes: {  
        '': 'home',
        'first': 'routeToFirst',
        '*default': 'noRoute'
    },

    home: function(){
        console.log("Home Route");

        if(view){
            view.undelegateEvents(); // Read the Explanation of Seventh below
        }
        view = new HomeView({el: '#content'});
        view.render();
    },

    routeToFirst: function(){
        console.log("First Route");

        if(view){
            view.undelegateEvents(); // Read the Explanation of Seventh below
        }
        view = new FirstView({el: '#content'});
        view.render();
    },

    noRoute: function(){
        console.log("No Route");

        if(view){
            view.undelegateEvents(); // Read the Explanation of Seventh below
        }
        view = new NoRouteView({el: '#content'});
        view.render();
    }
});

let router = new AppRouter();

Backbone.history.start();

/* --------------------------------------- EXPLANATION OF ROUTER --------------------------------------- 
1) (routes:)The routes property is an object with keys and values.
2) Each key in this object describe a path in your application, so it maps to URL hash fragments.
3) ('': 'home')the empty string associated to the absents of an hash fragments and it generally maps to your main view
4) ('*default') is a special type of Route that basically is called whenever you type rooted is not present in the routes list. It will basically map to the hash fragment that is not recognised as a valid hash fragments in the list.
5) (let router = new AppRouter();) We need to create a NEW OBJECT of this type(AppRouter), we need to call this constructor >> (let AppRouter = Backbone.Router.extend({});)
6) ('Backbone.history.start();') >> When you call this Backbone.history.start, it will start listening on any hash fragment change in thr URL and when that happens it will call the ROUTER that in turn will fire the function associated to the hash fragment.
7) undelegateEvents() : Removes all of the view's delegated events. Useful if you want to disable or remove a view from the DOM temporarily.(this is important!)

------------------------------------------- FLOW EVENTS -------------------------------------------
The ROUTER last element of the chain the one that connects the URL with VIEWS and MODELS. 
And then, the views kicks in display the data, you interact with the data that changes the status of the model and the changes reflected back in to the view. And then you can navigate out of the page in to other views.

And everything flows back in to the ROUTER that select the correct function to call the function is the entry point that creates another model and another view and displays the view.


*/
