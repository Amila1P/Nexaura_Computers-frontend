export default function getFormattedPrice(price){
    if(price == null || price == undefined){
        return "N/A";
    }
    const priceInNumber = Number(price);
    if(isNaN(priceInNumber)){
        return "N/A";
    }else{
        return "LKR " + priceInNumber.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
}