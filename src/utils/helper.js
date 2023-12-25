
module.exports = class Helper {

    static getCurrentISODateString() {
        return new Date().toISOString().split('T')[0];
    }

    static getFormattedImageName(destination, imageName) {
        return destination + imageName;
    }
}