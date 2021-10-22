/**
 * @name parseToHEX
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {string}
 * @todo 캔버스 클릭 시 해당 값의 rgb를 가져오고, 가져온 값을 hex값으로 치환하는 기능입니다.
 */
const parseToHEX = (r, g, b) => {
	if (r > 255 || g > 255 || b > 255) throw 'Over the rgb state.';
	return ((r << 16) | (g << 8) | b).toString(16);
};

export default parseToHEX;
