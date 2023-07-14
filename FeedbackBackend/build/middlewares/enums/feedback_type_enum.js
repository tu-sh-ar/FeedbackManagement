"use strict";
// creating enum to maintain the delivery_type fields
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedback_type = void 0;
var feedback_type;
(function (feedback_type) {
    feedback_type[feedback_type["UserToDeliveryAgent"] = 1] = "UserToDeliveryAgent";
    feedback_type[feedback_type["DeliveryAgentToUser"] = 2] = "DeliveryAgentToUser";
    feedback_type[feedback_type["UserToClient"] = 4] = "UserToClient";
})(feedback_type = exports.feedback_type || (exports.feedback_type = {}));
