var Pseudo = function(code=[]) {
	this.code = code;
	this.variables = [];
};

Pseudo.prototype.view = function(selector) {
	if ($(selector).length) {
		for (var l in this.code) {
			$(selector).append(this._addLine(this.code[l], selector));
		}
	} else {
		console.error("Pseudo.view: '"+selector+"' not found!");
	}
};

Pseudo.prototype.addVariable = function(info) {
	if (!this.getVariable(info.name)) {
		this.variables.push(info);
	}
};

Pseudo.prototype.getVariable = function(name) {
	for (var v in this.variables) {
		var vari =  this.variables[v];
		if (vari.name === name)
			return vari;
	}
	return undefined;
};

Pseudo.prototype._addLine = function(line, selector) {
	var args = line.args;
	var uuid = guid();

	var html = "";
	html += "<div class='line' data-type='"+line.type+"' data-uuid='"+uuid+"'>";
	switch (line.type) {
		case "create":
			switch (args.type) {
				case "var":
					this.addVariable(line.args);
					html +=
							"<div class='line-type'>CREATE</div>"+
							"<div class='pre'>"+
								"<div class='var-type'>"+args.class+" </div>"+args.name+
								"  =  "+args.value+
							"</div>";
				break;
			};
		break;

		case "set":
			html +=
				"<div class='line-type'>SET</div>"+
				"<div class='pre'>"+args.name+" "+htmlEncode(args.type)+" "+args.value+"</div>";
		break;

		case "if":
			html +=
				"<div class='line-type'>IF</div>"+
				"<div class='pre'>"+args.name+" "+htmlEncode(args.type)+" "+args.value+"</div>"+
				"<div class='children'>";
				for (var l3 in args.lines) {
					html += this._addLine(args.lines[l3], '.line[data-uuid="'+uuid+'"] > .children')
				}
				html += "</div>";
		break;

		case "else":
			html +=
				"<div class='line-type'>ELSE</div>"+
				"<div class='children'>";
				for (var l3 in args.lines) {
					html += this._addLine(args.lines[l3], '.line[data-uuid="'+uuid+'"] > .children')
				}
				html += "</div>";
		break;

		case "loop":
			switch (args.type) {
				case "for-to":
					this.addVariable({
						type: "var",
						cass: "int",
						name: args.var,
						value: args.start
					});
					html +=
						"<div class='line-type'>FOR</div>"+
						"<div class='pre'>"+args.var+" = "+args.start+" to "+args.end+"</div>"+
						"<div class='children'>";

					for (var l2 in args.lines) {
						html += this._addLine(args.lines[l2], '.line[data-uuid="'+uuid+'"] > .children');
					}
					html +=
						"</div>";

				break;
			};
		break;
	}
	html += "</div>";

	return html;
};
