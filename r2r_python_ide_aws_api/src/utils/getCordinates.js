export default function getCoordinates(userList) {
    const userLength = userList.length;
    const center = { x: 0, y: 0 }; // Center of the circle
    const centersvgpath = { x: 140, y: 140 }; // Center of the circle
    const radiusCircle = 100; // Radius of the circle
    const radiusSvg = 180; // Radius of the circle

    const angleIncrement = 360 / userLength; // Constant distance in degree

    const coordinates = [];

    for (let i = 0; i < userLength; i++) {
        const angle = i * angleIncrement;
        const radians = ((angle + angleIncrement / 2) * Math.PI) / 180;
        const radiansSvgLinePoint1 = ((angle) * Math.PI) / 180;
        const radiansSvgLinePoint2 = ((angle + angleIncrement) * Math.PI) / 180;

        const x = center.x + radiusCircle * Math.cos(radians);
        const y = center.y + radiusCircle * Math.sin(radians);

        const lx1 = centersvgpath.x + radiusSvg * Math.cos(radiansSvgLinePoint1);
        const ly1 = centersvgpath.y + radiusSvg * Math.sin(radiansSvgLinePoint1);
        const lxmid = centersvgpath.x + 400 * Math.cos(radians);
        const lymid = centersvgpath.y + 400 * Math.sin(radians);
        const lx2 = centersvgpath.x + radiusSvg * Math.cos(radiansSvgLinePoint2);
        const ly2 = centersvgpath.y + radiusSvg * Math.sin(radiansSvgLinePoint2);
        const background = Math.floor(Math.random() * 16777215).toString(16)
        const dot = Math.floor(Math.random() * 16777215).toString(16)
        coordinates.push({
            x, y,
            lx1,
            ly1,
            lxmid,
            lymid,
            lx2,
            ly2,
            color: { background, dot },
            user: userList[i]
        });
    }
    // console.log(coordinates);
    return coordinates;
}