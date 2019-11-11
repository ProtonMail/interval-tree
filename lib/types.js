export var Direction;
(function (Direction) {
    Direction[Direction["LEFT"] = 0] = "LEFT";
    Direction[Direction["RIGHT"] = 1] = "RIGHT";
    Direction[Direction["NIL"] = 2] = "NIL";
})(Direction || (Direction = {}));
export var Color;
(function (Color) {
    Color[Color["RED"] = 0] = "RED";
    Color[Color["BLACK"] = 1] = "BLACK";
    Color[Color["NIL"] = 2] = "NIL";
})(Color || (Color = {}));
export var LinkedListResult;
(function (LinkedListResult) {
    LinkedListResult[LinkedListResult["DELETE_NODE"] = 0] = "DELETE_NODE";
    LinkedListResult[LinkedListResult["KEEP_NODE"] = 1] = "KEEP_NODE";
    LinkedListResult[LinkedListResult["NOT_FOUND"] = 2] = "NOT_FOUND";
})(LinkedListResult || (LinkedListResult = {}));
