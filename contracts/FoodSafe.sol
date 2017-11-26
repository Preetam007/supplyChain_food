pragma solidity ^0.4.6;

contract FoodSafe {

   struct Location {
       string name;
       uint locationId;
       uint previousLocationId;
       uint timestamp;
       string secret;
   }

   mapping(uint => Location) Trail;
   // by default trail count is zero;
   uint8 TrailCount; 

   function addNewLocation(uint locationId, string name,string secret) {

       Location memory newLocation;

       newLocation.name = name;
       newLocation.locationId = locationId;
       newLocation.secret = secret;
       newLocation.timestamp = now;

       if (TrailCount!=0) {
         newLocation.previousLocationId = Trail[TrailCount].locationId;
       }

       Trail[TrailCount] = newLocation;
       TrailCount++;


   }

   function getTrailCount() returns(uint8) {
      return TrailCount;
   }

   function getLocation(uint8 trailNo) returns(string,uint,uint,uint,string) {
      return (Trail[trailNo].name,Trail[trailNo].locationId,Trail[trailNo].previousLocationId,Trail[trailNo].timestamp,Trail[trailNo].secret);
   }





}