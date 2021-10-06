
AFRAME.registerComponent('clickhandler', {
    init: function () {

        this.el.sceneEl.addEventListener(
            "arSessionReady",
            this.addListeners.call(this)
        );

    },

    addListeners: function () {
        //console.log("add listeners fired")
        this.el.addEventListener('click', e => {
           // console.log("lkjez")
            //window.location.href = 'https://linktr.ee/b2renger'
            //window.open('https://www.linktr.ee/b2renger', '_blank').focus();
           // alert('Clicked!')
        });

       
    }


});


/* Ar-session-notifier Function: to set a flag when the arSession is ready 
  "ready"-state means: when other components can access the system, and use the ar.js core. */
AFRAME.registerComponent("ar-session-notifier", {
    init: function () {
        var scene = this.el.sceneEl;
        var arSession = null;
        // wait until the arSession is ready
        var idx = setInterval(function () {
            arSession = scene.systems["arjs"]._arSession;
            if (!arSession) return; // It just checks when the _arSession is not undefined, or null - and emits a signal.
            scene.emit("arSessionReady");
            clearInterval(idx);
        });
    }
});

/* Cursor-hack Function: to adjust the jsartoolkit5 projection matrix and the threejs projection matrix and emitting click-events */
AFRAME.registerComponent("cursor-modifier", {
    init: function () {
        var scene = this.el;

        // wait until the arSession is ready
        scene.addEventListener("arSessionReady", function () {
            var arSession = scene.systems["arjs"]._arSession;
            // helpers
            var raycaster = new THREE.Raycaster();
            var mouse = new THREE.Vector2();
            // useful references
            var cursorElement = document.querySelector("[cursor]");
            var arToolkitContext = arSession.arContext;
            var camera = scene.camera;

            function mousedown(event) {
                // core of this 'hack' - using the arToolkitContext projection matrix
                // makes sure that jsartoolkit5 projection matrix is not out of sync with the threejs projection matrix
                camera.projectionMatrix.copy(
                    arToolkitContext.getProjectionMatrix()
                );
                camera.projectionMatrixInverse.copy(
                    camera.projectionMatrix
                ).invert();

                var point;
                if (event.type === "touchmove" || event.type === "touchstart") {
                    // Track the first touch for simplicity.
                    point = event.touches.item(0);
                } else {
                    point = event;
                }
                // Calculate mouse position based on the canvas element
                var rect = scene.renderer.domElement.getBoundingClientRect();
                mouse.x = ((point.clientX - rect.left) / rect.width) * 2 - 1;
                mouse.y = -((point.clientY - rect.top) / rect.height) * 2 + 1;
                raycaster.setFromCamera(mouse, camera);
                // if there are any intersections - send the clicks
                var intersects = raycaster.intersectObjects(
                    scene.object3D.children,
                    true
                );
                if (intersects.length > 3) {
                    // this click is stripped of any info it should have
                   // console.log(intersects)
                    intersects[3].object.el.emit("click");
                }
                event.stopPropagation();
            }
            window.addEventListener("mousedown", mousedown, false);
            window.addEventListener('touchstart', mousedown, false);
        });
    }
});
