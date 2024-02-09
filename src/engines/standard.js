//import { hmLog } from '../utils/hmlog.js';
var HmLog = require("../utils/hmlog.js");

const engineVersion = function() {
	return "Standard engine *** v0.1 ***";
}


const prepareGraph = function(graphItems, contextProps, validTargets) {
	let items = graphItems;
	//What's happening here again?
	
	var nodesAttributes = {};
	HmLog.hmLog('Vertex count: ' + items.length);

	var nodes = [];
	var arcs = [];

	for (var eidx in items) {
		let node = items[eidx];
		var nodeProps = [`shape="box"`];

		if (node.context_type && contextProps[node.context_type] != null) {
			//hmLog("Adding " + contextProps[node.context_type] + " as node props");
			nodeProps = contextProps[node.context_type];
		}

		if (node.display_label) { nodeProps.push(`label="${node.display_label}"`); }
		nodes.push(`"${node["context_id"]}" [${nodeProps.join(",")}];`);
		nodesAttributes[node["context_id"]] = { "id": node.id, "label": node.label, "text": node.description, "context_type": node.context_type }; //Could not figure out how to access images

		if (node["stratigraphy"]) {
			for (var cix in node["stratigraphy"]) {
				let child = node["stratigraphy"][cix];
				var relation = "";

				if (child["other_context"] == null) continue;
				let otherContextId = child["other_context"]["context_id"];
				if (validTargets[otherContextId] == null) continue;

				if (child["relationship"]) {
					if (['fills', 'covers', 'cuts', 'leans against'].includes(child["relationship"])) {
						relation = `"${node["context_id"]}" -> "${otherContextId}";`;
					} else if (['is filled by', 'is covered by', 'is cut by', 'carries'].includes(child["relationship"])) {
						relation = `"${otherContextId}" -> "${node["context_id"]}";`;
					} else if (['is the same as', 'is bound to'].includes(child["relationship"])) {
						relation = `"${otherContextId}" -> "${node["context_id"]}" [style="dashed", color="blue", dir="none"];`;
					} else {
						//hmLog(`Not managed: ${child["relationship"]}`);
					}
				}

				if (!arcs.includes(relation)) {
					arcs.push(relation);
				}
			}
		}
	}

	return {"graph": nodes.join("\n") + "\n" + arcs.join("\n"), "attributes": nodesAttributes};
}

module.exports = { engineVersion, prepareGraph }
