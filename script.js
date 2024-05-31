const startstop = document.getElementById("startstop");
const seconds = document.getElementById("seconds");
const minutes = document.getElementById("minutes");
const hours = document.getElementById("hours");
const days = document.getElementById("days");

const today = new Date();
const todayAt12 = new Date();
todayAt12.setHours(0, 0, 0, 0);
const birthdate = new Date("06/19/2024");
let totalSeconds = 0;
if (todayAt12.getTime() === birthdate.getTime()) {
  totalSeconds = 0;
} else {

  totalSeconds = (birthdate - today) / 1000;
}

const setDisplay = (sec) => {
  days.innerText = String(Math.floor(sec / (24 * 60 * 60))).padStart(2, "0");
  sec = sec % (24 * 60 * 60);
  hours.innerText = String(Math.floor(sec / (60 * 60))).padStart(2, "0");
  sec = sec % (60 * 60);
  minutes.innerText = String(Math.floor(sec / 60)).padStart(2, "0");
  sec = sec % 60;
  seconds.innerText = String(Math.floor(sec)).padStart(2, "0");
};

const timer = setInterval(() => {
  if (totalSeconds <= 0) {
    totalSeconds = 0;
    clearInterval(timer);
    return;
  }
  totalSeconds -= 1;
  setDisplay(totalSeconds);
}, 1000);



"use strict";

import * as THREE from "three";

import { OrbitControls as t } from "three/addons/controls/OrbitControls.js";

import { RGBELoader as e } from "three/addons/loaders/RGBELoader.js";

!(function () {
  function n() {
    (R.aspect = window.innerWidth / window.innerHeight),
      R.updateProjectionMatrix(),
      m.setSize(window.innerWidth, window.innerHeight);
  }
  function o(t) {
    for (let e = 0; e < t.count; e++)
      t.getMatrixAt(e, x),
        x.decompose(b.position, b.quaternion, b.scale),
        (b.position.y -= h * ((e % 4) + 1)),
        b.position.y < -a
          ? ((b.position.y = a),
            (b.position.x = THREE.MathUtils.randFloat(-a, a)),
            (b.position.z = THREE.MathUtils.randFloat(-a, a)))
          : e % 4 == 1
          ? ((b.position.x += u), (b.position.z += p))
          : e % 4 == 2
          ? ((b.position.x += u), (b.position.z -= p))
          : e % 4 == 3
          ? ((b.position.x -= u), (b.position.z += p))
          : ((b.position.x -= u), (b.position.z -= p)),
        (b.rotation.x += THREE.MathUtils.randFloat(0, d)),
        (b.rotation.z += THREE.MathUtils.randFloat(0, c)),
        b.updateMatrix(),
        t.setMatrixAt(e, b.matrix);
    t.instanceMatrix.needsUpdate = !0;
  }
  function i() {
    requestAnimationFrame(i), H.update(), g && o(g), f && o(f), m.render(M, R);
  }
  const a = 5,
    r = 0.15,
    s = 1800,
    E = 150,
    l = 0.1,
    d = Math.PI / 30,
    c = Math.PI / 50,
    h = 0.007,
    u = 0.005,
    p = 0.005,
    w = 0.05;
  let R, M, m, H, T, g, f;
  const b = new THREE.Object3D(),
    x = new THREE.Matrix4(),
    P = new THREE.Color();
  new e().load(
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/equirectangular/blouberg_sunrise_2_1k.hdr",
    function (e) {
      ((T = e).mapping = THREE.EquirectangularReflectionMapping),
        (function () {
          function e() {
            const t = ["white", "gold"];
            return t[Math.floor(Math.random() * t.length)];
          }
          /*!
      this function from : https://discourse.threejs.org/t/simple-curved-plane/26647/10
    */ function o(
            t,
            n = !0
          ) {
            for (let o = 0; o < t.count; o++)
              x.makeRotationFromEuler(
                new THREE.Euler(
                  Math.random() * Math.PI,
                  Math.random() * Math.PI,
                  Math.random() * Math.PI
                )
              ),
                x.setPosition(
                  THREE.MathUtils.randFloat(-a, a),
                  THREE.MathUtils.randFloat(-a, a),
                  THREE.MathUtils.randFloat(-a, a)
                ),
                t.setMatrixAt(o, x),
                n && t.setColorAt(o, P.set(e()));
            return t;
          }
          ((R = new THREE.PerspectiveCamera(
            35,
            window.innerWidth / window.innerHeight,
            0.1,
            3 * a
          )).position.z = a * Math.sqrt(2)),
            ((M = new THREE.Scene()).environment = T),
            (M.environment.mapping = THREE.EquirectangularReflectionMapping),
            M.add(new THREE.AmbientLight("white", 0.8));
          const d = new THREE.DirectionalLight("white", 5);
          (d.position.y = 0), (d.position.z = a), M.add(d);
          const c = new THREE.PlaneGeometry(r, r / 3, 30, 1);
          !(function (t, e) {
            let n = 0.5 * t.parameters.width,
              o = new THREE.Vector2(-n, 0),
              i = new THREE.Vector2(0, e),
              a = new THREE.Vector2(n, 0),
              r = new THREE.Vector2().subVectors(o, i),
              s = new THREE.Vector2().subVectors(i, a),
              E = new THREE.Vector2().subVectors(o, a),
              l =
                (r.length() * s.length() * E.length()) /
                (2 * Math.abs(r.cross(E))),
              d = new THREE.Vector2(0, e - l),
              c =
                2 *
                (new THREE.Vector2().subVectors(o, d).angle() - 0.5 * Math.PI),
              h = t.attributes.uv,
              u = t.attributes.position,
              p = new THREE.Vector2();
            for (let t = 0; t < h.count; t++) {
              let e = 1 - h.getX(t),
                n = u.getY(t);
              p.copy(a).rotateAround(d, c * e), u.setXYZ(t, p.x, n, -p.y);
            }
            u.needsUpdate = !0;
          })(c, w),
            c.center(),
            c.computeVertexNormals();
          let h = new THREE.MeshBasicMaterial({
            color: "white",
            reflectivity: 1,
            envMap: T,
            side: THREE.DoubleSide
          });
          (g = o((g = new THREE.InstancedMesh(c, h, s)))),
            M.add(g),
            (h = h.clone());
          const u = (function (t) {
            let e = [];
            for (let n = 0; n < 2 * t; n++) {
              let o, i;
              e.push(0, 0, -0.25),
                n % 2 == 0 ? ((o = 0.5), (i = 1)) : ((o = 1), (i = 0.5));
              let a = ((n + 1) / t) * Math.PI;
              e.push(Math.cos(a) * o, Math.sin(a) * o, 0),
                (a = (n / t) * Math.PI),
                e.push(Math.cos(a) * i, Math.sin(a) * i, 0);
            }
            e = new Float32Array(e);
            let n = new THREE.BufferGeometry();
            return (
              n.setAttribute("position", new THREE.BufferAttribute(e, 3)),
              (n.attributes.position.needsUpdate = !0),
              n.computeVertexNormals(),
              n.center(),
              n
            );
          })(5);
          u.scale(l, l, l),
            (h = h.clone()).color.set("#ffe866"),
            (f = o((f = new THREE.InstancedMesh(u, h, E)), !1)),
            M.add(f),
            (m = new THREE.WebGLRenderer({
              antialias: !0,
              alpha: !0
            })).setPixelRatio(window.devicePixelRatio),
            m.setSize(window.innerWidth, window.innerHeight),
            (m.shadowMap.enabled = !1),
            document.body.appendChild(m.domElement),
            ((H = new t(R, m.domElement)).target.y = 0),
            (H.autoRotate = !0),
            (H.autoRotateSpeed = 2),
            (H.enableDamping = !0),
            (H.enablePan = !1),
            (H.minDistance = 1),
            (H.maxDistance = a * Math.sqrt(2)),
            (H.minPolarAngle = 0),
            (H.maxPolarAngle = Math.PI / 2),
            H.update(),
            i(),
            window.addEventListener("resize", n);
        })();
    }
  );
})();
