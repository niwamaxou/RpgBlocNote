describe('controller: simpleNoteCtrl', function() {
      var mockData = [{note: 'note 1', _id: 1}, {note: 'note 2', _id: 2}];
      var lastNote = {note: 'note 2', _id: 2};

      beforeEach(module('rpgNoteApp'));
      beforeEach(module('notesServices'));

      describe('query', function(){
         var scope, ctrl;

         beforeEach(inject(function($rootScope, $controller) {
           scope = $rootScope.$new();
           ctrl = $controller('SimpleNoteController', {$scope: scope});
           init = {
                query: function () {
                    scope.notes = mockData;
                    scope.noteDisplayed = mockData[mockData.length-1];
                }
           }

           spyOn(init, 'query').and.callThrough();
           init.query();
         }));


         it('should get all simple notes', function() {
            expect(init.query).toHaveBeenCalled();
            expect(true).toBe(angular.equals(scope.notes, mockData));
         });
         it('should displayed the last note', function() {
            expect(true).toBe(angular.equals(scope.noteDisplayed, lastNote));
          });

      });
})
