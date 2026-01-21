const pre = document.getElementById('donut');

let A = 0, B = 0;

const R1 = 1; 
const R2 = 2; 
const K2 = 5; 
const shades = ".,-~:;=!*#$@";

function render() {
    const width = Math.floor(window.innerWidth / 8);  
    const height = Math.floor(window.innerHeight / 16); 
    const K1 = width * K2 * 3 / (8 * (R1 + R2));

    const output = Array(width * height).fill(' ');
    const zbuffer = Array(width * height).fill(0);

    for (let theta = 0; theta < 2 * Math.PI; theta += 0.03) {
        const costheta = Math.cos(theta);
        const sintheta = Math.sin(theta);

        for (let phi = 0; phi < 2 * Math.PI; phi += 0.01) {
            const cosphi = Math.cos(phi);
            const sinphi = Math.sin(phi);

            const circlex = R2 + R1 * costheta;
            const circley = R1 * sintheta;

            const x = circlex * (Math.cos(B) * cosphi + Math.sin(A) * Math.sin(B) * sinphi) - circley * Math.cos(A) * Math.sin(B);
            const y = circlex * (Math.sin(B) * cosphi - Math.sin(A) * Math.cos(B) * sinphi) + circley * Math.cos(A) * Math.cos(B);
            const z = K2 + Math.cos(A) * circlex * sinphi + circley * Math.sin(A);
            const ooz = 1 / z;

            const xp = Math.floor(width / 2 + K1 * ooz * x);
            const yp = Math.floor(height / 2 - K1 * ooz * y);
            const idx = xp + width * yp;

            const L = cosphi * costheta * Math.sin(B) - Math.cos(A) * costheta * sinphi - sintheta * Math.sin(A) + Math.cos(B) * (Math.cos(A) * sintheta - costheta * Math.sin(A) * sinphi);

            if (idx >= 0 && idx < width * height) {
                if (ooz > zbuffer[idx]) {
                    zbuffer[idx] = ooz;
                    output[idx] = shades[Math.max(0, Math.floor(L * (shades.length - 1)))] || ' ';
                }
            }
        }
    }

    pre.textContent = '';
    for (let i = 0; i < height; i++) {
        pre.textContent += output.slice(i * width, (i + 1) * width).join('') + '\n';
    }

    A += 0.07;
    B += 0.03;
}

setInterval(render, 30);

// Redraw when window changes
window.addEventListener('resize', render);

