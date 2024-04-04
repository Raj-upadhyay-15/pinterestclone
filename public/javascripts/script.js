document.addEventListener("DOMContentLoaded", function () {
    // Your GSAP and ScrollTrigger animations go here
    gsap.registerPlugin(ScrollTrigger);
    var tl = gsap.timeline()



    tl.from(".box", {
        y: 130,
        delay:0,
        // x:130,
        opacity:0,
        duration: 0.5,
        // scrollTrigger: {
        //     trigger: "#mainpage",
        //     start: "top 5%",
        //     // end: "top -50%",
        //     scrub: 1,
        //   markers:true,
         

        // },
    });
});

