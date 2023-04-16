extern crate serde;
use serde_derive::Deserialize;
use wasm_bindgen::prelude::*;

#[derive(serde_derive::Serialize, Deserialize)]
pub struct Vector3 {
    pub x: f32,
    pub y: f32,
    pub z: f32
}

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
}

const joints: [[usize;3];14] = [
    [11, 13, 15],
    [12, 14, 16],
    [23, 25, 27],
    [24, 26, 28],
    [25, 23, 24],
    [26, 24, 23],
    [11, 23, 25],
    [12, 24, 26],
    [13, 11, 23],
    [14, 12, 24],
    [13, 11, 12],
    [14, 12, 11],
    [25, 27, 31],
    [26, 28, 32]
];

const distances: [[usize;2];22] = [
    [11,13],
    [12,14],
    [13,15],
    [14,16],
    [23,25],
    [24,26],
    [25,27],
    [26,28],
    [11,15],
    [12,16],
    [23,27],
    [24,28],
    [23,15],
    [24,16],
    [11,27],
    [12,28],
    [23,16],
    [24,15],
    [13,14],
    [25,26],
    [15,16],
    [27,28]
];

#[wasm_bindgen]
pub fn test(keypoints: &JsValue) -> Box<[f32]> {
    let mut arr: [f32;14 + 22 + 1] = [0.0;14 + 22 + 1];
    let keys: Vec<Vector3> = keypoints.into_serde().unwrap();

    let mut idx:usize = 0;
    for joint in joints {
        let a = keys.get(joint[0]).unwrap();
        let b = keys.get(joint[1]).unwrap();
        let c = keys.get(joint[2]).unwrap();
        let ab = [b.x - a.x, b.y - a.y, b.z - a.z];
        let bc = [c.x - b.x, c.y - b.y, c.z - b.z];
        let ab_vec = (ab[0] * ab[0] + ab[1] * ab[1] + ab[2] * ab[2]).sqrt();
        let bc_vec = (bc[0] * bc[0] + bc[1] * bc[1] + bc[2] * bc[2]).sqrt();
        let ab_norm = [ab[0] / ab_vec, ab[1] / ab_vec, ab[2] / ab_vec];
        let bc_norm = [bc[0] / bc_vec, bc[1] / bc_vec, bc[2] / bc_vec];
        let res = ab_norm[0] * bc_norm[0] + ab_norm[1] * bc_norm[1] + ab_norm[2] * bc_norm[2];
        arr[idx] = (std::f32::consts::PI - res.acos()) / std::f32::consts::PI;
        idx+=1;
    }
    
    arr[idx] = get_distance_between_two_vec(
        &get_average_between_two_vec(keys.get(23).unwrap(), keys.get(24).unwrap()), 
        &get_average_between_two_vec(keys.get(11).unwrap(), keys.get(12).unwrap())
    );
    idx += 1;

    for distance in distances {
        let p1 = keys.get(distance[0]).unwrap();
        let p2 = keys.get(distance[1]).unwrap();
        arr[idx] = get_distance_between_two_vec(p1, p2);
        idx+=1;
    }
    Box::new(arr)
}

fn get_average_between_two_vec(p1: &Vector3, p2: &Vector3) -> Vector3 {
    return Vector3 {
        x: (p1.x + p2.x) / 2.0,
        y: (p1.y + p2.y) / 2.0,
        z: (p1.x + p2.z) / 2.0,
    };
}

fn get_distance_between_two_vec(p1: &Vector3, p2: &Vector3) -> f32 {
    let a = p2.x - p1.x;
    let b = p2.y - p1.y;
    let c = p2.z - p1.z;
    return f32::sqrt(a * a + b * b + c * c) / 30.0;
}
