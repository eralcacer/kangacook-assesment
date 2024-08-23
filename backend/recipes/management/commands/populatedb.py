import json
from django.core.management.base import BaseCommand
from ...models import Recipe

class Command(BaseCommand):
    help = 'Populates the database with recipes from a JSON file'

    def handle(self, *args, **kwargs):
        try:
            with open('data/recipes.json', 'r') as file:
                data = json.load(file)
                recipes = data.get('recipes', [])
                
                for recipe_data in recipes:
                    title = recipe_data.get('title')
                    description = recipe_data.get('description')
                    
                    Recipe.objects.create(title=title, description=description)

                self.stdout.write(self.style.SUCCESS('Successfully populated the database with recipes!'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error: {str(e)}"))
