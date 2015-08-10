$(document).on('ready', function(){

	var total = 0.00

	var quoteCount = 0

	var myArr = []
	var colorArr = []
	var finish = []
//====================================  constructors =======================================================
	var Order = function(shirts, locations, colors, price){
		this.shirts = shirts
		this.locations = locations
		this.colors = colors
		this.price = price		
	}


//=====================================  multiple locations  =================================================

	Order.prototype.multipleLocations = function(){
		var shirts = this.shirts
		var locations = this.locations
		var colors = this.colors
		
		colorArr.forEach(function(element){
			for (var i = 0; i < priceList.length; i++) {
			var num = Number(element)
			
			// console.log(priceList[i].shirtCountLow, '-', priceList[i].shirtCountHigh, '-', priceList[i].shirtColor, '-', priceList[i].shirtPrice, '-', num)
				if((shirts >= priceList[i].shirtCountLow) && (shirts <= priceList[i].shirtCountHigh) && (num === priceList[i].shirtColor)){
				var output = finish.push(priceList[i].shirtPrice)
		
				return output

			
				}

			}
		})

		

		finish.forEach(function(element){
			var output = total += element * shirts
			console.log(output)
			return output
		})
	


	}



//============================================  1 location  ========================================================



	Order.prototype.render = function(){
		var shirts = this.shirts
		var locations = this.locations
		var colors = this.colors

		for (var i = 0; i < priceList.length; i++) {
			if((shirts >= priceList[i].shirtCountLow) && (shirts <= priceList[i].shirtCountHigh) && (colors === priceList[i].shirtColor)){
				var output = total += (priceList[i].shirtPrice * shirts)
				// console.log(output)
				return output
			}
		}
	}





//==========================================  checkboxes  ======================================================





//================================ Submit button ======================================================

	
	$('.submit-button').on('click', function(event){
		event.preventDefault()
		total = 0
		var tempShirts = Number($('.shirts').val())
		var tempColors = Number($('.colors').val())
		var tempLocations = Number($('#number-prints').val())
		var newOrder = new Order(tempShirts, tempLocations, tempColors)
		if (tempLocations === 1){
			newOrder.render()
			$('.total-container').empty()
			$('.total-container').append('<div class="total"><h5>Total: $' + total + '</h5><div>') 
		}
		else {
			newOrder.multipleLocations()
			$('.total-container').empty() 
			$('.total-container').append('<div class="total"><h5>Total: $' + total + '</h5><div>')
			// console.log(finish)
		}
	})


//================================  Drop down print number ============================================


    var printValue = $('#number-prints').val()

	var colorTemplateRenderer = function (val) {

		$('.colors-container').empty()

			for (var i = 0; i < val; i++) {
				quoteCount ++
				myArr.push($('[data-id]'))

				// console.log('quoteCount:', quoteCount);

			$('.colors-container').append('<div class="form-group"><label>How many colors:</label><select class="colors"  data-id="' + quoteCount + '">' +
                          '<option value="1">1</option>' +
                          '<option value="2">2</option>' +
                          '<option value="3">3</option>' +
                          '<option value="4">4</option>' +
                          '<option value="5">5</option>' +
                          '<option value="6">6</option>' +
                          '<option value="7">7</option>' +
                          '<option value="8">8</option>' +
                          '<option value="9">9</option>' +
                          '<option value="10">10</option>' +
                      '</select>' +
                      '<label><input type="checkbox">Front</label>' + '<label><input type="checkbox"> Back </label>' +
                  '<label><input type="checkbox"> Left sleeve </label>' + 
                  '<label><input type="checkbox"> Right sleeve </label>' +
                  '<label><input type="checkbox"> Other: <input type="form control"></label>' +
                  '<label>Upload art files</label><input type="file"></div><hr>')
		}
	}

	

	colorTemplateRenderer(printValue)

	$(document).on('change', '#number-prints', function(event){
	
		event.preventDefault()

		colorArr = []

		quoteCount = 0
		
		var tempQuoteId = quoteCount;

		printValue = $(this).val()

		colorTemplateRenderer(printValue)

		$('.colors').each(function(){
			var colorClass = colorArr.push($(this).val())

		})
			console.log(colorArr)	

		// console.log(myArr)

	})
	
	$('.colors-container').on('change', '.colors', function(){
		// console.log($(this))
		var colorClass = colorArr.unshift($(this).val())
		colorArr.pop()
		console.log(colorArr)
	})
