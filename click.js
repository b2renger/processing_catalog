
AFRAME.registerComponent("click", {
    init: function () {
        this.el.addEventListener("click", (e) => {
            console.log("yeah file")
            //window.location.href = "https://lintr.ee/b2renger"
        })
    }
})
