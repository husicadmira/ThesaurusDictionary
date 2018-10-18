import mockAxios from "axios";
import SynonimsService from "../../../services/synonims.service";
jest.mock("axios");

describe('Synonims Service', () => {

    describe('getSynonims', () => {
        it("should return synonims for given word", async () => {

            mockAxios.get.mockImplementationOnce(() =>
                Promise.resolve({
                    data: { synonims: ["firstSynonim", "secondSynonim"] }
                })
            );

            const response = await SynonimsService.getSynonims("word");

            expect(response).toEqual({ synonims: ["firstSynonim", "secondSynonim"] });
            expect(mockAxios.get).toHaveBeenCalledTimes(1);
            expect(mockAxios.get).toHaveBeenCalledWith(
                "/dictionary/word"
            );
        });
    });

    describe('add word', () => {
        it("should add word with synonims to dictionary and return success message", async () => {
            mockAxios.post.mockImplementationOnce(() =>
                Promise.resolve({
                    data: { message: "Word is added in dictionary" }
                })
            );

            const response = await SynonimsService.addWord("word", ["firstSynonim", "secondSynonim"]);
            
            expect(response).toEqual({ message: "Word is added in dictionary" });
            expect(mockAxios.post).toHaveBeenCalledTimes(1);
            expect(mockAxios.post).toHaveBeenCalledWith(
                "/dictionary",
                { word: "word", synonims: ["firstSynonim", "secondSynonim"] }
            );
        });
    });
});